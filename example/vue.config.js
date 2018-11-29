module.exports = {
  chainWebpack: config => {
    config.module
      .rule('docs')
      .oneOf('docs')
      .resourceQuery(/blockType=docs/)
      .use('through-loader')
      .loader('vuepress-plugin-component-catalog/src/through-loader')
      .end();
  },
};
