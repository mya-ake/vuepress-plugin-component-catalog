import { readFile, writeFile } from './../../utils/file';
import { VueParser } from './../../parser';
import { ComponentContext, VuePressPage } from './../../types';

export default ({ context }: { context: ComponentContext }): VuePressPage => {
  const source = readFile(context.absolutePathname);
  const vueParser = new VueParser({ source, fileName: context.fileName });

  const docsBlock = vueParser.getCustomBlock('docs');
  context.existDocs = docsBlock !== null;
  const content = docsBlock !== null ? docsBlock.content : '';
  writeFile(context.catalogPathname, content);
  return {
    path: context.link,
    filePath: context.catalogPathname,
  };
};
