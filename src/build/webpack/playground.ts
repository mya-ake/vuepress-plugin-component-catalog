import path from 'path';

import { VuePressOpenContext } from 'src/types';

export default ({ config, ctx }: { config: any; ctx: VuePressOpenContext }) => {
  config.resolve.alias
    .set('@playground', ctx.tempPath)
    .set('@cwd', process.cwd());

  const playgroundLoaderPath = path.resolve(
    __dirname,
    '..',
    '..',
    'playground-loader.js',
  );
  const mdRule = config.module.rule('markdown');
  const mdLoader = mdRule.uses.get('markdown-loader');
  mdRule.uses.delete('markdown-loader');
  mdRule
    .use('playground-loader')
    .loader(require.resolve(playgroundLoaderPath))
    .options({ ctx });
  mdRule.uses.set('markdown-loader', mdLoader);
};
