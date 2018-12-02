import path from 'path';

import buildVueCliWebpackConfig from './vue-cli';
import { ProjectEnviromentContext } from './../../types';

export default (config: any, environment: ProjectEnviromentContext) => {
  // Ignore docs blocks when building VuePress
  const loaderPath = path.resolve(__dirname, '..', '..', 'through-loader.js');
  console.log(loaderPath);
  config.module
    .rule('docs')
    .oneOf('docs')
    .resourceQuery(/blockType=docs/)
    .use('through-loader')
    .loader(require.resolve(loaderPath))
    .end();

  // Setting for each environment
  if (environment.vueCLI) {
    buildVueCliWebpackConfig(config);
  }
  if (environment.nuxt) {
    // TODO
  }
};
