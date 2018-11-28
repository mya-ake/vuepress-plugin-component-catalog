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

module.exports = {
  buildDcosPage,
};
