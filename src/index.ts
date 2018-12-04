import { NAME } from './constants';
import { setDefaultOptions, scanProject } from './utils/environment';
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
  setDefaultOptions(options);
  if (typeof options.rootDir !== 'string') {
    logger.error(
      new Error(
        'Please set rootDir option. Because automatic project scan failed.',
      ),
    );
    process.exit(1);
  }

  const environment = scanProject(options);

  const dirContext = buildDirContext({
    environment,
    rootDir: options.rootDir as string,
    include: options.include,
    exclude: options.exclude,
    distDirPrefix: options.distDirPrefix,
    ctx,
  });

  const componentContextMap = buildComponentContextMap({ dirContext });

  buildDocs({ componentContextMap, dirContext });

  return {
    name: NAME,
    plugins: buildPlugins({ dirContext, environment }),
    chainWebpack: config => {
      buildWebpackConfig({ config, options, environment, dirContext });
    },
    additionalPages: buildPages({ dirContext, componentContextMap }),
  };
};
