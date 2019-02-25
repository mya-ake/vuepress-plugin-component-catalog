import { VuePressOpenContext } from 'src/types';
import playgroundTransform from './playground';

export default ({ config, ctx }: { config: any; ctx: VuePressOpenContext }) => {
  config
    .plugin('playground-transform')
    .use(playgroundTransform.bind(null, ctx));
};
