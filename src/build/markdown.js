const expandComponents = components => {
  return components
    .map(component => {
      return `  - [${component.name}](/${component.link}/)`;
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

module.exports = {
  buildComponentList,
};
