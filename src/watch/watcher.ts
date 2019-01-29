import chokidar from 'chokidar';

import update from './update';
import {
  DirContext,
  ComponentContext,
  WatchComponentMap,
  CatalogOptions,
} from 'src/types';

const buildWatchContextMap = ({
  componentContextMap,
}: {
  componentContextMap: Map<string, ComponentContext[]>;
}): WatchComponentMap => {
  const map: WatchComponentMap = {};
  for (const componentContexts of componentContextMap.values()) {
    for (const context of componentContexts) {
      const key = context.relativePathname;
      map[key] = context;
    }
  }
  return map;
};

export default ({
  dirContext,
  componentContextMap,
  options,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
  options: CatalogOptions;
}) => {
  const componentWatcher = chokidar.watch(['**/*.vue'], {
    cwd: dirContext.rootDir,
    ignored: '**/node_modules/**',
    ignoreInitial: true,
  });

  const watchComponentMap = buildWatchContextMap({ componentContextMap });

  componentWatcher.on('change', (pathname: string) => {
    update({
      type: 'change',
      pathname,
      watchComponentMap,
      dirContext,
      componentContextMap,
      options,
    });
  });
};
