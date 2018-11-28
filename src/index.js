const path = require('path');

const { buildComponentsContext } = require('./build/components');
const { createIndex, createDocs } = require('./build/markdown');
const { buildDcosPage } = require('./build/page');
const { removeDir } = require('./utils/file');

const buildPages = ({ componentsDir, configDir }) => {
  const componentsContext = buildComponentsContext(componentsDir);
  const catalogDir = path.join(configDir, '__catalog__');
  removeDir(catalogDir);

  createDocs({ catalogDir, componentsContext });

  const indexPathname = createIndex({
    catalogDir,
    templatePathname: path.resolve(__dirname, 'templates/index.md'),
    componentsContext,
  });

  const pages = [
    {
      path: '/components/',
      filePath: indexPathname,
    },
    ...buildDcosPage({ componentsContext }),
  ];

  return pages;
};

module.exports = {
  buildPages,
};
