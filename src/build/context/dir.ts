import path from 'path';

import {
  DirContext,
  VuePressOpenContext,
  ProjectEnviromentContext,
} from './../../types';
import { DIST_DEFAULT_PREFIX } from './../../constants';

const defaultExclude = ['**/node_modules/**', 'node_modules', 'dist'];
const nuxtExclude = ['.nuxt'];

export default ({
  environment,
  rootDir,
  include = [],
  exclude = [],
  distDirPrefix,
  ctx,
}: {
  environment: ProjectEnviromentContext;
  rootDir: string;
  include?: string | string[];
  exclude?: string | string[];
  distDirPrefix?: string;
  ctx: VuePressOpenContext;
}): DirContext => {
  const { sourceDir } = ctx;
  const configDir = path.join(sourceDir, '.vuepress');
  const catalogDir = path.join(configDir, '.catalog');
  const prefix = distDirPrefix || DIST_DEFAULT_PREFIX;
  include = Array.isArray(include) ? include : [include];
  exclude = Array.isArray(exclude) ? exclude : [exclude];
  exclude.push(...defaultExclude);

  if (environment.nuxt) {
    exclude.push(...nuxtExclude);
  }

  return {
    rootDir,
    sourceDir,
    include,
    exclude,
    configDir,
    catalogDir,
    distDirPrefix: prefix,
  };
};
