import Consola from 'consola';

import { NAME } from './../constants';

// @ts-ignore: TS2339
const logger = Consola.create({
  defaults: {
    tag: NAME,
  },
});

export default logger;
