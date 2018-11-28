const path = require('path');
const { buildPages } = require('./src');
const { buildRegisterComponentsDir } = require('./src/build/components');

module.exports = (options, ctx) => {
  console.log('context', ctx.tempPath);
  console.log('options', options);
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
  }

  const configDir = path.join(sourceDir, '.vuepress');
  const pages = buildPages({ componentsDir, configDir });

  return {
    name: 'component-catalog',
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
