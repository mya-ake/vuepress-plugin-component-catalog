import { StringMap } from './common.interface';

export interface CatalogOptions {
  rootDir?: string;
  include?: string | string[];
  exclude?: string | string[];
  distDirPrefix?: string;
  alias?: StringMap;
}
