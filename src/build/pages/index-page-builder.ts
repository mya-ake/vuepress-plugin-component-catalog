import { readFile } from './../../utils/file';
import { VueParser } from './../../parser';
import { ComponentContext } from 'src/types';

const buildComponentsMarkdownForTheme = (
  componentContexts: ComponentContext[],
) => {
  return componentContexts
    .map(context => {
      const source = readFile(context.absolutePathname);
      const vueParser = new VueParser({ source, fileName: context.fileName });
      const docsListBlock = vueParser.getCustomBlock('docs-list');
      if (docsListBlock === null) {
        return null;
      }
      const content = docsListBlock.content.trim();
      return `<VpccGridViewItem to="${context.link}"><template slot="name">${
        context.name
      }</template>${content}</VpccGridViewItem>`;
    })
    .filter(text => text !== null)
    .join('\n');
};

const buildComponentsMarkdown = (componentContexts: ComponentContext[]) => {
  return componentContexts
    .map(context => {
      return context.existDocs
        ? `  - [${context.name}](${context.link})`
        : `  - ${context.name}`;
    })
    .join('\n');
};

export const buildIndexPageMarkdownForTheme = ({
  componentContextMap,
}: {
  componentContextMap: Map<string, ComponentContext[]>;
}): string => {
  const frontmatter = `---
layout: GridView
---
`;
  let markdown = '# Components\n';

  for (const [dirName, componentContexts] of componentContextMap.entries()) {
    const compoentsListMarkdown = buildComponentsMarkdownForTheme(
      componentContexts,
    );
    markdown += `\n## ${dirName}\n\n`;
    markdown += `<VpccGridView>\n`;
    markdown += compoentsListMarkdown;
    markdown += `</VpccGridView>\n`;
  }

  return frontmatter + markdown;
};

export const buildIndexPageMarkdown = ({
  componentContextMap,
}: {
  componentContextMap: Map<string, ComponentContext[]>;
}): string => {
  let markdown = '# Components\n';
  for (const [dirName, componentContexts] of componentContextMap.entries()) {
    const compoentsListMarkdown = buildComponentsMarkdown(componentContexts);
    markdown += `- ${dirName}\n${compoentsListMarkdown}\n`;
  }
  return markdown;
};
