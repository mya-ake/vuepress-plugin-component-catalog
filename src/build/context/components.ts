import path from 'path';

import {
  getFilePathnames,
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
  componentsDir,
}: {
  filePathnames: string[];
  componentsDir: string;
}): Map<string, ComponentFileContext[]> => {
  const map = new Map();
  filePathnames
    .map(pathname => {
      const relativePathname = pathname.replace(componentsDir, '');
      const fileName = extractFileName(relativePathname) as string;
      const dirName = relativePathname.replace(fileName, '');
      const name = fileName.split('.').shift();
      return {
        absolutePathname: pathname,
        relativePathname: pathname.replace(componentsDir, ''),
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
  return `/${path.join(distDirPrefix, ...pathnameList, slug)}`;
};

export default ({
  dirContext,
}: {
  dirContext: DirContext;
}): Map<string, ComponentContext> => {
  const { componentsDir } = dirContext;
  const vueFilePathnames = getFilePathnames(componentsDir).filter(isVueFile);
  const fileContextMap = divideByDirectory({
    filePathnames: vueFilePathnames,
    componentsDir,
  });
  const componentContextMap = new Map();
  for (const [dirName, fileContexts] of fileContextMap.entries()) {
    const componentContexts = fileContexts.map(fileContext => {
      const link = buildLink({
        ...fileContext,
        distDirPrefix: dirContext.distDirPrefix,
      });
      return {
        ...fileContext,
        link,
        catalogPathname: null,
        existDoc: false,
      };
    });
    componentContextMap.set(dirName, componentContexts);
  }
  return componentContextMap;
};
