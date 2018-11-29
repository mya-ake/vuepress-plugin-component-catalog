const path = require('path');
const { buildPages } = require('./src');
const { buildRegisterComponentsDir } = require('./src/build/components');

const { NAME } = require('./src/constants');
const logger = require('./src/utils/logger');

module.exports = (options, ctx) => {
  const { sourceDir } = ctx;

  const plugins = [];
  const { componentsDir } = options;
  if (typeof componentsDir === 'string') {
    plugins.push([
      '@vuepress/register-components',
      {
        componentsDir: buildRegisterComponentsDir(componentsDir),
      },
    ]);
  } else {
    logger.error(new Error('Require componentsDir option'));
    process.exit(1);
  }

  const configDir = path.join(sourceDir, '.vuepress');
  const pages = buildPages({ componentsDir, configDir });

  return {
    name: NAME,
    plugins,
    additionalPages: pages,
    chainWebpack: config => {
      config.module
        .rule('docs')
        .oneOf('docs')
        .resourceQuery(/blockType=docs/)
        .use('through-loader')
        .loader(require.resolve('./src/through-loader.js'))
        .end();
    },
  };
};
