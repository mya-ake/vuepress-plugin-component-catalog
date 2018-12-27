import { StringMap } from './common.interface';

export interface CatalogOptions {
  rootDir?: string;
  staticDir?: string;
  include?: string | string[];
  exclude?: string | string[];
  distDirPrefix?: string;
  alias?: StringMap;
  vueCli?: {
    configPath?: string;
  };
  nuxt?: {
    configPath?: string;
  };
}
