import path from 'path';

import { DirContext, VuePressOpenContext } from './../../types';
import { DIST_DEFAULT_PREFIX } from './../../constants';

export default ({
  componentsDir,
  distDirPrefix,
  ctx,
}: {
  componentsDir: string;
  distDirPrefix?: string;
  ctx: VuePressOpenContext;
}): DirContext => {
  const { sourceDir } = ctx;
  const configDir = path.join(sourceDir, '.vuepress');
  const catalogDir = path.join(configDir, '.catalog');
  const prefix = distDirPrefix || DIST_DEFAULT_PREFIX;

  return {
    sourceDir,
    componentsDir,
    configDir,
    catalogDir,
    distDirPrefix: prefix,
  };
};
