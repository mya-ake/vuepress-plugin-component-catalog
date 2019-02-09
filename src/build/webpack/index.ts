import path from 'path';

import buildPlaygroundWebpackConfig from './playground';
import buildVueCliWebpackConfig from './vue-cli';
import buildNuxtWebpackConfig from './nuxt';
import {
  ProjectEnviromentContext,
  CatalogOptions,
  DirContext,
  VuePressOpenContext,
} from 'src/types';

export default ({
  config,
  options,
  environment,
  dirContext,
  ctx,
}: {
  config: any;
  options: CatalogOptions;
  environment: ProjectEnviromentContext;
  dirContext: DirContext;
  ctx: VuePressOpenContext;
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

  buildPlaygroundWebpackConfig({ config, ctx });

  // Setting for each environment
  if (environment.vueCLI) {
    buildVueCliWebpackConfig(config);
  }
  if (environment.nuxt) {
    buildNuxtWebpackConfig({ config, options, dirContext });
  }
};
