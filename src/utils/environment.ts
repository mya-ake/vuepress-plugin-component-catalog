import path from 'path';

import { existPathname } from './file';
import { CatalogOptions, ProjectEnviromentContext } from '../types';

export const setDefaultOptions = (options: CatalogOptions) => {
  options.rootDir = options.rootDir || process.env.PWD;
  if (!options.rootDir) {
    return;
  }

  const { vueCli = {}, nuxt = {} } = options;
  options.vueCli = {
    configPath: path.join(options.rootDir as string, 'vue.config.js'),
    ...vueCli,
  };
  options.nuxt = {
    configPath: path.join(options.rootDir as string, 'nuxt.config.js'),
    ...nuxt,
  };
};

export const scanProject = ({
  vueCli = {},
  nuxt = {},
}: CatalogOptions): ProjectEnviromentContext => {
  return {
    vueCLI: existPathname(vueCli.configPath as string),
    nuxt: existPathname(nuxt.configPath as string),
  };
};
