import { DirContext } from 'src/types';
import express from 'express';

export default ({ dirContext }: { dirContext: DirContext }) => {
  if (dirContext.staticDir === null) {
    return {};
  }

  const { staticDir } = dirContext;

  return {
    beforeDevServer(app) {
      app.use(express.static(staticDir, { index: false }));
    },
  };
};
