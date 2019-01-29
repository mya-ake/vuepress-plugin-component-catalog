import {
  buildIndexPageMarkdown,
  buildIndexPageMarkdownForTheme,
} from './index-page-builder';
import { buildDocsPage } from './';
import {
  ComponentContext,
  VuePressPage,
  DirContext,
  CatalogOptions,
} from 'src/types';

export const buildIndexPage = ({
  dirContext,
  componentContextMap,
  options,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
  options: CatalogOptions;
}): VuePressPage => {
  const content = options.usingTheme
    ? buildIndexPageMarkdownForTheme({ componentContextMap })
    : buildIndexPageMarkdown({ componentContextMap });
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
      return buildDocsPage({ context });
    });
    pages = [...pages, ...componentsPages];
  }
  return pages;
};

export default ({
  dirContext,
  componentContextMap,
  options,
}: {
  dirContext: DirContext;
  componentContextMap: Map<string, ComponentContext[]>;
  options: CatalogOptions;
}): VuePressPage[] => {
  return [
    ...buildComponentPages({ componentContextMap }),
    buildIndexPage({ dirContext, componentContextMap, options }),
  ];
};
