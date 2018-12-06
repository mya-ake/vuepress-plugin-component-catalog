import { ComponentContext } from './../../types';

const buildComponentsMarkdown = (componentContexts: ComponentContext[]) => {
  return componentContexts
    .map(context => {
      return context.existDocs
        ? `  - [${context.name}](${context.link})`
        : `  - ${context.name}`;
    })
    .join('\n');
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
