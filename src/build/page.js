const { createDocContent } = require('./markdown');

const buildDcosPage = ({ componentsContext }) => {
  return componentsContext.reduce((pages, dirContext) => {
    const dirPages = dirContext.components
      .filter(context => context.existDoc)
      .map(context => {
        return {
          path: `/${context.link}/`,
          filePath: context.docPathname,
        };
      });
    return pages.concat(dirPages);
  }, []);
};

const buildDcosPage2 = ({ componentsContext }) => {
  return componentsContext.reduce((pages, dirContext) => {
    const dirPages = dirContext.components
      .map(context => {
        return {
          path: `/${context.link}/`,
          content: createDocContent(context),
        };
      })
      .filter(page => page.context !== null);
    return pages.concat(dirPages);
  }, []);
};

module.exports = {
  buildDcosPage,
  buildDcosPage2,
};
