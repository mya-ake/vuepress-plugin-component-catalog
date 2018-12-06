import { readFile, writeFile } from './../../utils/file';
import { VueParser } from './../../parser';
import { ComponentContext, DirContext } from './../../types';

export default ({
  componentContextMap,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
}) => {
  for (const componentContexts of componentContextMap.values()) {
    for (const context of componentContexts) {
      const source = readFile(context.absolutePathname);
      const vueParser = new VueParser({ source, fileName: context.fileName });

      const docsBlock = vueParser.getCustomBlock('docs');
      if (docsBlock === null) {
        writeFile(context.catalogPathname, '');
      } else {
        context.existDoc = true;
        writeFile(context.catalogPathname, docsBlock.content);
      }
    }
  }
};
