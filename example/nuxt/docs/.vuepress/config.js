const path = require('path');

const PROJECT_DIR = path.join(__dirname, '..', '..')
const SRC_DIR = path.resolve(PROJECT_DIR, 'app');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const SCSS_DIR = path.join(SRC_DIR, 'assets', 'scss');
const SASS_AUTO_IMPORTS = `
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
    data: SASS_AUTO_IMPORTS,
  },

  plugins: [
    [
      'vuepress-plugin-component-catalog',
      // require(path.resolve(PROJECT_DIR, '..', '..', 'dist', 'index.js')),
      {
        // nuxt: {  // nuxt option
        //   configPath: path.join(PROJECT_DIR, 'nuxt.config.js'),
        // },
        // include: ['**/components/**'],  // Specify the target to create a catalog
        // exclude: ['**/layouts/**'],  // Specify a target that does not create a catalog
        // alias: { // import path alias
        //   '@': SRC_DIR,
        // },
      },
    ],
  ],
};
