const path = require('path');
const {
  getFilePathnames,
  getDirPathnames,
  extractFileName,
  extractExtension,
} = require('./../utils/file');
const { camelToHyphen } = require('./../utils/common');

const buildRegisterComponentsDir = dirPathname => {
  return [dirPathname, ...getDirPathnames(dirPathname)];
};

const isVueFile = pathname => {
  return extractExtension(pathname) === 'vue';
};

const buildComponentContext = ({ dirPathname, dirName }) => {
  const pathnames = getFilePathnames(dirPathname, { deep: false });
  return pathnames.filter(isVueFile).map(pathname => {
    const filename = extractFileName(pathname);
    const name = filename.split('.').shift();
    return {
      name,
      filename,
      filePathname: pathname,
      link: path.join('components', dirName, camelToHyphen(name)),
      existDoc: false,
      docPathname: null,
    };
  });
};

const buildComponentsContext = dirPathname => {
  const dirs = buildRegisterComponentsDir(dirPathname);
  return dirs.map(dir => {
    const dirName = dir.replace(dirPathname, '');
    return {
      dirName,
      components: buildComponentContext({ dirPathname: dir, dirName }),
    };
  });
};

module.exports = {
  buildComponentsContext,
  buildRegisterComponentsDir,
};
