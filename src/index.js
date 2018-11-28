const path = require('path');
const { buildComponentsContext } = require('./build/components');
const { buildComponentList } = require('./build/markdown');
const { readFile, writeFile } = require('./utils/file');

const buildPages = ({ componentsDir, configDir }) => {
  // const componentPathnames = getComponents(componentsDir);
  const componentsContext = buildComponentsContext(componentsDir);
  const catalogDir = path.join(configDir, '__catalog__');

  let indexContent = readFile(path.resolve(__dirname, 'templates/index.md'));
  indexContent += '\n' + buildComponentList({ componentsContext });
  const indexPathname = path.join(catalogDir, 'index.md');

  writeFile(indexPathname, indexContent);

  const pages = [
    {
      path: '/components/',
      filePath: indexPathname,
    },
  ];

  return pages;
};

module.exports = {
  buildPages,
};
