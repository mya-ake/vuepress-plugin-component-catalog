const { writeFile } = require('./../utils/file');
const { createDocContent } = require('./../build/markdown');

const update = ({ pathname, contextMap }) => {
  const context = contextMap[pathname];
  const targetDistPathname = context.docPathname;
  const content = createDocContent(context);
  writeFile(targetDistPathname, content);
};

module.exports = {
  update,
};
