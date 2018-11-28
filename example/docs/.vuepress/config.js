const path = require('path');

const PROJECT_DIR = path.join(__dirname, '..', '..')
const COMPONENTS_DIR = path.join(PROJECT_DIR, 'src', 'components');

module.exports = {
  title: 'Component Catalog',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
    ]
  },

  plugins: [
    [
      'vuepress-plugin-component-catalog',
      {
        componentsDir: COMPONENTS_DIR,
      },
    ],
  ],
};
