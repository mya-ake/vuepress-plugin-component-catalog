module.exports = (options, ctx) => {
  console.log('context', ctx);
  console.log('options', options);

  const plugins = [];
  const { componentsDir } = options;
  if (typeof componentsDir === 'string') {
    plugins.push([
      '@vuepress/register-components',
      {
        componentsDir,
      },
    ]);
  }

  return {
    plugins,
    chainWebpack: config => {
      config.module
        .rule('docs')
        .oneOf('docs')
        .resourceQuery(/blockType=docs/)
        .use('through-loader')
        .loader(require.resolve('./through-loader.js'))
        .end();
    },
  };
};
