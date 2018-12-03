import { ComponentContext, VuePressPage } from './../../types';

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
  componentContextMap,
}: {
  componentContextMap: Map<string, ComponentContext[]>;
}): VuePressPage[] => {
  return [...buildComponentPages({ componentContextMap })];
};
