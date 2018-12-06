import { ComponentContext } from './context.interface';

export type UpdateState = 'add' | 'change' | 'unlink';
export type DocsState = 'update' | 'create' | 'remove' | 'none';

export interface WatchComponentMap {
  [key: string]: ComponentContext;
}

export interface UpdateDocsPageResult {
  state: DocsState;
}
