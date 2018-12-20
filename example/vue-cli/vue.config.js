const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const SCSS_DIR = path.join(SRC_DIR, 'assets', 'scss');

const SASS_AUTO_IMPORTS = `
@import "${path.join(SCSS_DIR, '_variables.scss')}";
`;

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: SASS_AUTO_IMPORTS,
      },
    },
  },

  chainWebpack: config => {
    config.module
      .rule('docs')
      .oneOf('docs')
      .resourceQuery(/blockType=docs/)
      .use('through-loader')
      .loader('vuepress-plugin-component-catalog/dist/through-loader')
      .end();
  },
};
