import { buildIndexPageMarkdown } from './index-page-builder';
import { ComponentContext, VuePressPage, DirContext } from './../../types';

export const buildIndexPage = ({
  dirContext,
  componentContextMap,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
}): VuePressPage => {
  const content = buildIndexPageMarkdown({ componentContextMap });
  return {
    path: `/${dirContext.distDirPrefix}/`,
    content,
  };
};

const buildComponentPages = ({
  componentContextMap,
}: {
  componentContextMap: Map<string, ComponentContext[]>;
}): VuePressPage[] => {
  let pages: VuePressPage[] = [];
  for (const componentContexts of componentContextMap.values()) {
    const componentsPages = componentContexts.map(context => {
      return {
        path: context.link,
        filePath: context.catalogPathname,
      } as VuePressPage;
    });
    pages = [...pages, ...componentsPages];
  }
  return pages;
};

export default ({
  dirContext,
  componentContextMap,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
}): VuePressPage[] => {
  return [
    buildIndexPage({ dirContext, componentContextMap }),
    ...buildComponentPages({ componentContextMap }),
  ];
};
