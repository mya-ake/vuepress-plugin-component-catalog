import path from 'path';

import buildVueCliWebpackConfig from './vue-cli';
import { ProjectEnviromentContext, CatalogOptions } from './../../types';

export default (
  config: any,
  options: CatalogOptions,
  environment: ProjectEnviromentContext,
) => {
  // Ignore docs blocks when building VuePress
  const loaderPath = path.resolve(__dirname, '..', '..', 'through-loader.js');
  config.module
    .rule('docs')
    .oneOf('docs')
    .resourceQuery(/blockType=docs/)
    .use('through-loader')
    .loader(require.resolve(loaderPath))
    .end();

  // sets alias
  const alias = options.alias || {};
  Object.entries(alias).forEach(([key, value]) => {
    config.resolve.alias.set(key, value);
  });

  // Setting for each environment
  if (environment.vueCLI) {
    buildVueCliWebpackConfig(config);
  }
  if (environment.nuxt) {
    // TODO
  }
};
