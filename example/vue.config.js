module.exports = {
  chainWebpack: config => {
    config.module
      .rule('docs')
      .oneOf('docs')
      .resourceQuery(/blockType=docs/)
      .use('through-loader')
      .loader(require.resolve('./loaders/through-loader.js'))
      .end();
  },
};
