import path from 'path';

import buildVueCliWebpackConfig from './vue-cli';
import buildNuxtWebpackConfig from './nuxt';
import {
  ProjectEnviromentContext,
  CatalogOptions,
  DirContext,
} from './../../types';

export default ({
  config,
  options,
  environment,
  dirContext,
}: {
  config: any;
  options: CatalogOptions;
  environment: ProjectEnviromentContext;
  dirContext: DirContext;
}) => {
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
    buildNuxtWebpackConfig({ config, options, dirContext });
  }
};
