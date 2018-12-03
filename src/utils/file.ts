import fs from 'fs';
import path from 'path';
import minimatch from 'minimatch';

export const existPathname = (pathname: string): boolean => {
  try {
    fs.statSync(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

const createDir = (pathname: string) => {
  fs.mkdirSync(pathname);
};

const ensureWriteProcess = (pathname: string) => {
  const fileDirname = path.dirname(pathname);
  if (existPathname(fileDirname)) {
    return;
  }
  ensureWriteProcess(fileDirname);
  createDir(fileDirname);
};

export const isMatchPathname = (pathname: string, globs: string[]): boolean => {
  if (globs.length === 0) {
    return false;
  }
  for (const glob of globs) {
    if (minimatch(pathname, glob)) {
      return true;
    }
  }
  return false;
};

export const writeFile = (pathname: string, data: string) => {
  ensureWriteProcess(pathname);
  fs.writeFileSync(pathname, data, { encoding: 'utf-8' });
};

export const readFile = (pathname: string): string => {
  return fs.readFileSync(pathname, { encoding: 'utf-8' });
};

export const getDirPathnames = (
  dirPathname: string,
  option: { deep?: boolean; include?: string[]; exclude?: string[] } = {},
): string[] => {
  const { deep = true, include = [], exclude = [] } = option;
  return fs
    .readdirSync(dirPathname)
    .filter(
      pathname => exclude.length === 0 || !isMatchPathname(pathname, exclude),
    )
    .filter(
      pathname => include.length === 0 || isMatchPathname(pathname, include),
    )
    .reduce(
      (newPathnames, pathname) => {
        const absoluteFilePath = path.join(dirPathname, pathname);
        if (fs.statSync(absoluteFilePath).isDirectory()) {
          newPathnames.push(absoluteFilePath);
          if (deep) {
            return newPathnames.concat(
              getDirPathnames(absoluteFilePath, option),
            );
          }
          return newPathnames;
        } else {
          return newPathnames;
        }
      },
      [] as string[],
    );
};

export const getFilePathnames = (
  dirPathname: string,
  option: { deep?: boolean; include?: string[]; exclude?: string[] } = {},
): string[] => {
  const { deep = true, include = [], exclude = [] } = option;
  return fs
    .readdirSync(dirPathname)
    .filter(
      pathname => exclude.length === 0 || !isMatchPathname(pathname, exclude),
    )
    .filter(
      pathname => include.length === 0 || isMatchPathname(pathname, include),
    )
    .reduce(
      (newPathnames, pathname) => {
        const absoluteFilePath = path.join(dirPathname, pathname);
        if (fs.statSync(absoluteFilePath).isDirectory()) {
          if (deep) {
            return newPathnames.concat(
              getFilePathnames(absoluteFilePath, option),
            );
          }
          return newPathnames;
        } else {
          return newPathnames.concat(absoluteFilePath);
        }
      },
      [] as string[],
    );
};

export const extractFileName = (pathname: string): string | null => {
  return pathname.split('/').pop() || null;
};

export const extractExtension = (pathname: string): string | null => {
  return pathname.split('.').pop() || null;
};
