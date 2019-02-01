import path from 'path';
import { DirContext, VuePressOpenContext } from 'src/types';
import mount from 'koa-mount';
import serveStatic from 'koa-static';
import express from 'express';
import { fs } from '@vuepress/shared-utils';

export default ({
  ctx,
  dirContext,
}: {
  ctx: VuePressOpenContext;
  dirContext: DirContext;
}) => {
  if (dirContext.staticDir === null) {
    return {};
  }

  const { staticDir } = dirContext;

  return {
    // < alpha.33
    enhanceDevServer(app) {
      const staticServer = serveStatic(staticDir);

      async function server(ctx, next) {
        if (ctx.url !== '/') {
          await staticServer(ctx, next);
        } else {
          await next();
        }
      }

      app.use(mount(ctx.base, server));
    },

    // >= alpha.33
    beforeDevServer(app) {
      app.use(express.static(staticDir));
    },

    async generated() {
      const indexFilePathname = path.join(staticDir, 'index.html');
      await fs.copy(staticDir, path.resolve(ctx.outDir), {
        filter(src) {
          return src !== indexFilePathname;
        },
      });
    },
  };
};
