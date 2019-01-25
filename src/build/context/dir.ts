import path from 'path';

import {
  DirContext,
  VuePressOpenContext,
  ProjectEnviromentContext,
  CatalogOptions,
} from 'src/types';
import { EXCLUDE, DIST_DEFAULT_PREFIX } from './../../constants';

export default ({
  environment,
  rootDir,
  include = [],
  exclude = [],
  distDirPrefix,
  ctx,
  options,
}: {
  environment: ProjectEnviromentContext;
  rootDir: string;
  include?: string | string[];
  exclude?: string | string[];
  distDirPrefix?: string;
  ctx: VuePressOpenContext;
  options: CatalogOptions;
}): DirContext => {
  const { sourceDir } = ctx;
  const configDir = path.join(sourceDir, '.vuepress');
  const catalogDir = path.join(ctx.tempPath, '.catalog');
  let staticDir = options.staticDir || null;
  const prefix = distDirPrefix || DIST_DEFAULT_PREFIX;
  include = Array.isArray(include) ? include : [include];
  exclude = Array.isArray(exclude) ? exclude : [exclude];
  exclude.push(...EXCLUDE.DEFAULT);

  if (environment.nuxt) {
    exclude.push(...EXCLUDE.NUXT);
  }

  if (staticDir === null) {
    if (environment.vueCLI) {
      staticDir = path.join(rootDir, 'public');
    }
    if (environment.nuxt && typeof options.nuxt === 'object') {
      const nuxtConfig = require(options.nuxt.configPath as string);
      const nuxtRootDir = ('rootDir' in nuxtConfig
        ? nuxtConfig.rootDir
        : rootDir
      ).replace(/\/$/, '');

      const srcDir = ('srcDir' in nuxtConfig
        ? path.join(nuxtRootDir, nuxtConfig.srcDir)
        : nuxtRootDir
      ).replace(/\/$/, '');

      staticDir = path.join(srcDir, 'static');
    }
  }

  return {
    rootDir,
    sourceDir,
    include,
    exclude,
    configDir,
    catalogDir,
    distDirPrefix: prefix,
    staticDir,
  };
};
