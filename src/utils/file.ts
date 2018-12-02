import fs from 'fs';
import path from 'path';

export const existPathname = (pathname: string) => {
  try {
    fs.statSync(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

export const getDirPathnames = (dirPathname: string) => {
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
