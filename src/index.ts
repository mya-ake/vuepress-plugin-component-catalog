import { NAME } from './constants';

import { scanProject } from './core';
import { buildWebpackConfig, buildPlugins } from './build';
import logger from './utils/logger';
import { CatalogOptions, VuePressOpenContext } from './types';

module.exports = (options: CatalogOptions, ctx: VuePressOpenContext) => {
  const environment = scanProject(process.env.PWD);

  const targetDir = options.componentsDir || process.env.PWD;
  if (typeof targetDir !== 'string') {
    logger.error(new Error('Require componentsDir option'));
    process.exit(1);
  }

  return {
    name: NAME,
    plugins: buildPlugins(targetDir as string),
    chainWebpack: config => {
      buildWebpackConfig(config, environment);
    },
  };
};
