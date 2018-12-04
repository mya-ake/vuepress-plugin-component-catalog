import { readFile, writeFile } from './../utils/file';
import { VueParser } from './../parser';
import { WatchComponentMap } from 'src/types';

export default ({
  pathname,
  watchComponentMap,
}: {
  type: string;
  pathname: string;
  watchComponentMap: WatchComponentMap;
}) => {
  const context = watchComponentMap[`/${pathname}`];
  if (!context || context.existDoc === false) {
    return;
  }

  const source = readFile(context.absolutePathname);
  const vueParser = new VueParser({ source, fileName: context.fileName });

  const docsBlock = vueParser.getCustomBlock('docs');
  if (docsBlock === null) {
    writeFile(context.catalogPathname as string, '');
  } else {
    writeFile(context.catalogPathname as string, docsBlock.content);
  }
};
