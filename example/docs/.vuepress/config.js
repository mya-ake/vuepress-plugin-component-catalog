const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..', '..');
const PROJECT_DIR = path.join(ROOT_DIR, 'example')
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
      require(`${ROOT_DIR}/index.js`),
      {
        componentsDir: COMPONENTS_DIR,
      },
    ],
  ],
};
