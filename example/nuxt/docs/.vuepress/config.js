const path = require('path');

const PROJECT_DIR = path.join(__dirname, '..', '..')
const SRC_DIR = path.resolve(PROJECT_DIR, 'app');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const SCSS_DIR = path.join(SRC_DIR, 'assets', 'scss');
const AUTO_IMPORT_SASS = `
@import "${path.join(SCSS_DIR, '_variables.scss')}";
`;

module.exports = {
  title: 'Component Catalog',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
    ]
  },

  scss: {
    data: AUTO_IMPORT_SASS,
  },

  plugins: [
    [
      'vuepress-plugin-component-catalog',
      // require(path.resolve(PROJECT_DIR, '..', '..', 'index.js')),
      {
        componentsDir: COMPONENTS_DIR,
        alias: {
          '@': SRC_DIR,
        },
      },
    ],
  ],
};
