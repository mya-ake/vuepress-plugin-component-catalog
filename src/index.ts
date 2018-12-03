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
  const rootDir = options.distDirPrefix || process.env.PWD;
  if (typeof rootDir !== 'string') {
    logger.error(
      new Error(
        'Please set rootDir option. Because Automatic project scan failed.',
      ),
    );
    process.exit(1);
  }

  const environment = scanProject(rootDir);

  const dirContext = buildDirContext({
    rootDir: rootDir as string,
    include: options.include,
    exclude: options.exclude,
    distDirPrefix: options.distDirPrefix,
    ctx,
  });

  const componentContextMap = buildComponentContextMap({ dirContext });

  buildDocs({ componentContextMap, dirContext });

  return {
    name: NAME,
    plugins: buildPlugins({ dirContext }),
    chainWebpack: config => {
      buildWebpackConfig(config, options, environment);
    },
    additionalPages: buildPages({ dirContext, componentContextMap }),
  };
};
