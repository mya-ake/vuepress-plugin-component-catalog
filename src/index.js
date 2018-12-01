const path = require('path');

const { buildComponentsContext } = require('./build/components');
const { createIndex2, createDocs } = require('./build/markdown');
const { buildDcosPage } = require('./build/page');
const { removeDir } = require('./utils/file');
const { update, watchComponents } = require('./watch');

const buildPages = ({ componentsDir, configDir }) => {
  const componentsContext = buildComponentsContext(componentsDir);
  const catalogDir = path.join(configDir, '__catalog__');
  removeDir(catalogDir);

  createDocs({ catalogDir, componentsContext });

  watchComponents({
    componentsDir,
    update,
    catalogDir,
    componentsContext,
  });

  const indexContent = createIndex2({
    templatePathname: path.resolve(__dirname, 'templates/index.md'),
    componentsContext,
  });

  const pages = [
    {
      path: '/components/',
      content: indexContent,
    },
    ...buildDcosPage({ componentsContext }),
  ];

  return pages;
};

module.exports = {
  buildPages,
};
