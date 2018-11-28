const fs = require('fs');
const path = require('path');

const existPathname = pathname => {
  try {
    fs.statSync(pathname);
    return true;
  } catch (err) {
    return false;
  }
};

const createDir = pathname => {
  fs.mkdirSync(pathname);
};

const ensureWriteProcess = pathname => {
  const fileDirname = path.dirname(pathname);
  if (existPathname(fileDirname)) {
    return;
  }
  ensureWriteProcess(fileDirname);
  createDir(fileDirname);
};

const getDirPathnames = dirPathname => {
  const pathnames = fs.readdirSync(dirPathname);
  return pathnames.reduce((newPathnames, pathname) => {
    const absoluteFilePath = path.join(dirPathname, pathname);
    if (fs.statSync(absoluteFilePath).isDirectory()) {
      newPathnames.push(absoluteFilePath);
      return newPathnames.concat(getDirPathnames(absoluteFilePath));
    } else {
      return newPathnames;
    }
  }, []);
};

const getFilePathnames = (dirPathname, { deep = true } = {}) => {
  const pathnames = fs.readdirSync(dirPathname);
  return pathnames.reduce((newPathnames, pathname) => {
    const absoluteFilePath = path.join(dirPathname, pathname);
    if (fs.statSync(absoluteFilePath).isDirectory()) {
      if (deep) {
        return newPathnames.concat(getFilePathnames(absoluteFilePath));
      }
      return newPathnames;
    } else {
      return newPathnames.concat(absoluteFilePath);
    }
  }, []);
};

const readFile = path => {
  return fs.readFileSync(path, { encoding: 'utf-8' });
};

const writeFile = (pathname, data) => {
  ensureWriteProcess(pathname);
  return fs.writeFileSync(pathname, data, { encoding: 'utf-8' });
};

const extractFileName = pathname => {
  return pathname.split('/').pop();
};

module.exports = {
  getDirPathnames,
  getFilePathnames,
  readFile,
  writeFile,
  extractFileName,
};
