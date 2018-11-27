const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..', '..');
const PROJECT_DIR = path.join(ROOT_DIR, 'example')
const COMPONENTS_DIR = path.join(PROJECT_DIR, 'src', 'components');

module.exports = {
  plugins: [
    [
      require(`${ROOT_DIR}/index.js`),
      {
        componentsDir: COMPONENTS_DIR,
      },
    ],
  ],
};
