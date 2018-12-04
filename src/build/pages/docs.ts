import path from 'path';
import { readFile, writeFile } from './../../utils/file';
import { VueParser } from './../../parser';
import { ComponentContext, DirContext } from './../../types';

export default ({
  dirContext,
  componentContextMap,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
}) => {
  for (const [dirName, componentContexts] of componentContextMap.entries()) {
    for (const context of componentContexts) {
      const source = readFile(context.absolutePathname);
      const vueParser = new VueParser({ source, fileName: context.fileName });

      const docsBlock = vueParser.getCustomBlock('docs');
      if (docsBlock === null) {
        continue;
      }

      context.existDoc = true;
      context.catalogPathname =
        path.join(dirContext.catalogDir, context.link).replace(/\/$/, '') +
        '.md';
      writeFile(context.catalogPathname, docsBlock.content);
    }
  }
};
