import fs from 'fs';
import path from 'path';

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

export const writeFile = (pathname: string, data: string) => {
  ensureWriteProcess(pathname);
  fs.writeFileSync(pathname, data, { encoding: 'utf-8' });
};

export const readFile = (pathname: string): string => {
  return fs.readFileSync(pathname, { encoding: 'utf-8' });
};

export const getDirPathnames = (dirPathname: string): string[] => {
  const pathnames = fs.readdirSync(dirPathname);
  return pathnames.reduce(
    (newPathnames, pathname) => {
      const absoluteFilePath = path.join(dirPathname, pathname);
      if (fs.statSync(absoluteFilePath).isDirectory()) {
        newPathnames.push(absoluteFilePath);
        return newPathnames.concat(getDirPathnames(absoluteFilePath));
      } else {
        return newPathnames;
      }
    },
    [] as string[],
  );
};

export const getFilePathnames = (
  dirPathname: string,
  { deep = true } = {},
): string[] => {
  const pathnames = fs.readdirSync(dirPathname);
  return pathnames.reduce(
    (newPathnames, pathname) => {
      const absoluteFilePath = path.join(dirPathname, pathname);
      if (fs.statSync(absoluteFilePath).isDirectory()) {
        if (deep) {
          return newPathnames.concat(getFilePathnames(absoluteFilePath));
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
