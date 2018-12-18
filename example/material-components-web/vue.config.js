const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const SCSS_DIR = path.join(SRC_DIR, 'assets', 'scss');

const AUTO_IMPORT_SASS = `
@import "${path.join(SCSS_DIR, '_variables.scss')}";
`;

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: AUTO_IMPORT_SASS,
        includePaths: ['./node_modules'],
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
