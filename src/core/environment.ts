import path from 'path';

import { existPathname } from './../utils/file';
import { ProjectEnviromentContext } from './../types';

export const scanProject = (
  dirPathname: string | undefined,
): ProjectEnviromentContext => {
  if (typeof dirPathname === 'undefined') {
    return { vueCLI: false, nuxt: false };
  }
  return {
    vueCLI: existPathname(path.join(dirPathname, 'vue.config.js')),
    nuxt: existPathname(path.join(dirPathname, 'nuxt.config.js')),
  };
};
