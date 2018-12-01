const chokidar = require('chokidar');

const createContextMap = (catalogDir, componentsContext) => {
  const map = {};
  componentsContext.forEach(dirContext => {
    dirContext.components.forEach(context => {
      const key = context.relativeFilePathname.replace(/^\//, '');
      map[key] = context;
    });
  });
  return map;
};

const watchComponents = ({
  componentsDir,
  update,
  catalogDir,
  componentsContext,
}) => {
  const componentWatcher = chokidar.watch(['**/*.vue'], {
    cwd: componentsDir,
  });

  const contextMap = createContextMap(catalogDir, componentsContext);

  componentWatcher
    .on('add', pathname => update({ type: 'add', pathname, contextMap }))
    .on('change', pathname =>
      update({
        type: 'change',
        pathname,
        contextMap,
      }),
    )
    .on('unlink', pathname =>
      update({
        type: 'unlink',
        pathname,
        contextMap,
      }),
    );
};

module.exports = {
  watchComponents,
};
