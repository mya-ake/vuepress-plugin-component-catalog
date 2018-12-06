import path from 'path';

import { buildDocsPage, buildIndexPage } from './../build/pages';
import {
  WatchComponentMap,
  DirContext,
  ComponentContext,
  UpdateDocsPageResult,
  UpdateState,
  DocsState,
} from 'src/types';

const updateIndex = ({
  dirContext,
  componentContextMap,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
}) => {
  buildIndexPage({ dirContext, componentContextMap });
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
}: {
  type: UpdateState;
  pathname: string;
  watchComponentMap: WatchComponentMap;
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
}) => {
  const { state } = updateDocsPage({
    pathname,
    watchComponentMap,
  });
  if (['create', 'remove'].includes(state)) {
    updateIndex({ dirContext, componentContextMap });
  }
};
