import { readFile, writeFile } from 'src/utils/file';
import { VueParser } from 'src/parser';
import { ComponentContext, VuePressPage } from 'src/types';

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
