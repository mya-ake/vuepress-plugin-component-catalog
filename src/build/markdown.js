const path = require('path');
const { parse } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');

const { readFile, writeFile } = require('./../utils/file');

/** index */
const expandComponents = components => {
  return components
    .map(component => {
      return component.existDoc
        ? `  - [${component.name}](/${component.link}/)`
        : `  - ${component.name}`;
    })
    .join('\n');
};

const buildComponentList = ({ componentsContext }) => {
  return componentsContext
    .map(context => {
      const componentsList = expandComponents(context.components);
      return `
- ${context.dirName}/
${componentsList}
`;
    })
    .join('\n');
};

const createIndex = ({ catalogDir, templatePathname, componentsContext }) => {
  let indexContent = readFile(templatePathname);
  indexContent += '\n' + buildComponentList({ componentsContext });
  const indexPathname = path.join(catalogDir, 'index.md');

  writeFile(indexPathname, indexContent);
  return indexPathname;
};

const createIndex2 = ({ templatePathname, componentsContext }) => {
  let indexContent = readFile(templatePathname);
  indexContent += '\n' + buildComponentList({ componentsContext });
  return indexContent;
};

/** docs */
const extractDocs = customBlocks => {
  return customBlocks.find(block => block.type === 'docs');
};

const createDocs = ({ catalogDir, componentsContext }) => {
  componentsContext.forEach(dirContext => {
    dirContext.components.forEach(context => {
      const source = readFile(context.filePathname);
      const descriptor = parse({
        source,
        compiler,
        filename: context.filename,
      });
      const docsBlock = extractDocs(descriptor.customBlocks);
      if (typeof docsBlock === 'undefined') {
        return;
      }
      context.existDoc = true;
      const distPathname = path.join(catalogDir, context.link) + '.md';
      writeFile(distPathname, docsBlock.content);
      context.docPathname = distPathname;
    });
  });
};

const createDocContent = context => {
  const source = readFile(context.filePathname);
  const descriptor = parse({
    source,
    compiler,
    filename: context.filename,
  });
  const docsBlock = extractDocs(descriptor.customBlocks);
  if (typeof docsBlock === 'undefined') {
    return null;
  }
  context.existDoc = true;
  return docsBlock.content;
};

module.exports = {
  createIndex,
  createIndex2,
  createDocs,
  createDocContent,
};
