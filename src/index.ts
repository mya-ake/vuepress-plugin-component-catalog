import path from 'path';

import { NAME } from './constants';
import { scanProject } from './core';
import {
  buildWebpackConfig,
  buildPlugins,
  buildDirContext,
  buildComponentContextMap,
  buildDocs,
  buildPages,
} from './build';
import logger from './utils/logger';
import { CatalogOptions, VuePressOpenContext } from './types';

module.exports = (options: CatalogOptions, ctx: VuePressOpenContext) => {
  const environment = scanProject(process.env.PWD);

  const componentsDir = options.componentsDir || process.env.PWD;
  if (typeof componentsDir !== 'string') {
    logger.error(new Error('Require componentsDir option'));
    process.exit(1);
  }

  const dirContext = buildDirContext({
    componentsDir: componentsDir as string,
    distDirPrefix: options.distDirPrefix,
    ctx,
  });

  const componentContextMap = buildComponentContextMap({ dirContext });

  buildDocs({ componentContextMap, dirContext });

  return {
    name: NAME,
    plugins: buildPlugins(componentsDir as string),
    chainWebpack: config => {
      buildWebpackConfig(config, environment);
    },
    additionalPages: buildPages({ componentContextMap }),
  };
};
