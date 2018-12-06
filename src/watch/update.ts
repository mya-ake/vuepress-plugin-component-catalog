import { readFile, writeFile } from './../utils/file';
import { VueParser } from './../parser';
import { buildIndexPage } from './../build/pages';
import {
  WatchComponentMap,
  DirContext,
  ComponentContext,
  UpdatePageResult,
  UpdateState,
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

const updatePage = ({
  pathname,
  watchComponentMap,
}: {
  type: UpdateState;
  pathname: string;
  watchComponentMap: WatchComponentMap;
}): UpdatePageResult => {
  const context = watchComponentMap[`/${pathname}`];
  if (!context) {
    return { state: 'none' };
  }

  const source = readFile(context.absolutePathname);
  const vueParser = new VueParser({ source, fileName: context.fileName });

  const docsBlock = vueParser.getCustomBlock('docs');
  if (docsBlock === null) {
    writeFile(context.catalogPathname as string, '');
    if (context.existDoc === true) {
      context.existDoc = false;
      return { state: 'remove' };
    } else {
      return { state: 'none' };
    }
  } else {
    writeFile(context.catalogPathname as string, docsBlock.content);
    if (context.existDoc === true) {
      return { state: 'update' };
    } else {
      context.existDoc = true;
      return { state: 'create' };
    }
  }
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
  const { state } = updatePage({
    type,
    pathname,
    watchComponentMap,
  });
  if (['create', 'remove'].includes(state)) {
    updateIndex({ dirContext, componentContextMap });
  }
};
