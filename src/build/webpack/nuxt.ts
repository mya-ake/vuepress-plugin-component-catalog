import path from 'path';

import { NUXT_DIR } from './../../constants';
import { CatalogOptions, DirContext } from './../../types';

export default ({
  config,
  options,
  dirContext,
}: {
  config: any;
  options: CatalogOptions;
  dirContext: DirContext;
}) => {
  if (!options.nuxt) {
    return;
  }
  const nuxtConfig = require(options.nuxt.configPath as string);

  const rootDir = ('rootDir' in nuxtConfig
    ? nuxtConfig.rootDir
    : dirContext.rootDir
  ).replace(/\/$/, '');

  const srcDir = ('srcDir' in nuxtConfig
    ? path.join(rootDir, nuxtConfig.srcDir)
    : rootDir
  ).replace(/\/$/, '');

  config.resolve.alias
    .set('~', srcDir)
    .set('~~', rootDir)
    .set('@', srcDir)
    .set('@@', rootDir)
    .set([NUXT_DIR.ASSETS], path.join(NUXT_DIR.ASSETS))
    .set([NUXT_DIR.STATIC], path.join(NUXT_DIR.STATIC));
};
