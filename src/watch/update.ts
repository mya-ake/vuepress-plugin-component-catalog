import path from 'path';

import { buildDocsPage, buildIndexPage } from './../build/pages';
import {
  WatchComponentMap,
  DirContext,
  ComponentContext,
  UpdateDocsPageResult,
  UpdateState,
  DocsState,
  CatalogOptions,
} from 'src/types';

const updateIndex = ({
  dirContext,
  componentContextMap,
  options,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
  options: CatalogOptions;
}) => {
  buildIndexPage({ dirContext, componentContextMap, options });
};

const updateDocsPage = ({
  pathname,
  watchComponentMap,
}: {
  pathname: string;
  watchComponentMap: WatchComponentMap;
}): UpdateDocsPageResult => {
  const context = watchComponentMap[`/${pathname}`];
  if (!context) {
    return { state: 'none' };
  }

  const beforeExistDocs = context.existDocs;
  buildDocsPage({ context });
  const afterExistDocs = context.existDocs;

  let state: DocsState = 'none';
  if (beforeExistDocs === false) {
    state = afterExistDocs ? 'create' : 'none';
  } else {
    state = afterExistDocs ? 'update' : 'remove';
  }
  return { state };
};

export default ({
  type,
  pathname,
  watchComponentMap,
  dirContext,
  componentContextMap,
  options,
}: {
  type: UpdateState;
  pathname: string;
  watchComponentMap: WatchComponentMap;
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
  options: CatalogOptions;
}) => {
  const { state } = updateDocsPage({
    pathname,
    watchComponentMap,
  });
  if (['create', 'remove'].includes(state)) {
    updateIndex({ dirContext, componentContextMap, options });
  }
};
