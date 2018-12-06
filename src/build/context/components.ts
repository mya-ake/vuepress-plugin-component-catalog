import path from 'path';

import {
  getFilePathnamesWithFilter,
  extractExtension,
  extractFileName,
} from './../../utils/file';
import { camelToHyphen } from './../../utils/common';
import {
  ComponentFileContext,
  ComponentContext,
  DirContext,
} from './../../types';

const isVueFile = (pathname: string): boolean => {
  const extension = extractExtension(pathname);
  return extension === 'vue';
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
    .map(pathname => {
      const relativePathname = pathname.replace(rootDir, '');
      const fileName = extractFileName(relativePathname) as string;
      const dirName = relativePathname.replace(fileName, '');
      const name = fileName.split('.').shift();
      return {
        absolutePathname: pathname,
        relativePathname: pathname.replace(rootDir, ''),
        dirName,
        fileName,
        name,
      };
    })
    .forEach(context => {
      const { dirName } = context;
      delete context.dirName;
      const pathnamesInDir = map.get(dirName) || [];
      pathnamesInDir.push(context);
      map.set(dirName, pathnamesInDir);
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
    const componentContexts = fileContexts.map(fileContext => {
      const link = buildLink({
        ...fileContext,
        distDirPrefix: dirContext.distDirPrefix,
      });
      const catalogPathname = buildCatalogPathname({ dirContext, link });
      return {
        ...fileContext,
        link,
        catalogPathname,
        existDocs: false,
      };
    });
    componentContextMap.set(dirName, componentContexts);
  }

  return componentContextMap;
};
