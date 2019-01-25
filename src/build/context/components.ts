import path from 'path';

import {
  getFilePathnamesWithFilter,
  extractExtension,
  extractFileName,
} from './../../utils/file';
import { camelToHyphen } from './../../utils/common';
import { ComponentFileContext, ComponentContext, DirContext } from 'src/types';

const isVueFile = (pathname: string): boolean => {
  const extension = extractExtension(pathname);
  return extension === 'vue';
};

export const buildComponentFileContext = ({
  rootDir,
  absolutePathname,
}: {
  rootDir: string;
  absolutePathname: string;
}): ComponentFileContext => {
  const relativePathname = absolutePathname.replace(rootDir, '');
  const fileName = extractFileName(relativePathname) as string;
  const dirName = relativePathname.replace(fileName, '');
  const name = fileName.split('.').shift() as string;
  return {
    absolutePathname,
    relativePathname,
    dirName,
    fileName,
    name,
  };
};

export const buildConmponentContext = ({
  dirContext,
  componentFileContext,
}: {
  dirContext: DirContext;
  componentFileContext: ComponentFileContext;
}): ComponentContext => {
  const link = buildLink({
    ...componentFileContext,
    distDirPrefix: dirContext.distDirPrefix,
  });
  const catalogPathname = buildCatalogPathname({ dirContext, link });
  return {
    ...componentFileContext,
    link,
    catalogPathname,
    existDocs: false,
  };
};

export const divideByDirectory = ({
  filePathnames,
  rootDir,
}: {
  filePathnames: string[];
  rootDir: string;
}): Map<string, ComponentFileContext[]> => {
  const map = new Map();
  filePathnames
    .map((pathname: string) => {
      return buildComponentFileContext({ rootDir, absolutePathname: pathname });
    })
    .forEach((context: ComponentFileContext) => {
      const { dirName } = context;
      const contextsInDir = map.get(dirName) || [];
      contextsInDir.push(context);
      map.set(dirName, contextsInDir);
    });
  return map;
};

export const buildLink = ({
  name,
  relativePathname,
  distDirPrefix,
}: {
  name: string;
  relativePathname: string;
  distDirPrefix: string;
}): string => {
  const slug = camelToHyphen(name);
  const pathnameList = relativePathname.split('/');
  pathnameList.pop();
  return `/${path.join(distDirPrefix, ...pathnameList, slug)}/`;
};

const buildCatalogPathname = ({
  dirContext,
  link,
}: {
  dirContext: DirContext;
  link: string;
}): string => {
  return path.join(dirContext.catalogDir, link).replace(/\/$/, '') + '.md';
};

export default ({
  dirContext,
}: {
  dirContext: DirContext;
}): Map<string, ComponentContext[]> => {
  const { rootDir, include, exclude } = dirContext;
  const vueFilePathnames = getFilePathnamesWithFilter(rootDir, {
    include,
    exclude,
  }).filter(isVueFile);

  const fileContextMap = divideByDirectory({
    filePathnames: vueFilePathnames,
    rootDir,
  });

  const componentContextMap = new Map();
  for (const [dirName, fileContexts] of fileContextMap.entries()) {
    const componentContexts = fileContexts.map(
      (componentFileContext: ComponentFileContext) => {
        return buildConmponentContext({ dirContext, componentFileContext });
      },
    );
    componentContextMap.set(dirName, componentContexts);
  }

  return componentContextMap;
};
