module.exports = {
  root: true,

  env: {
    node: true,
    commonjs: true,
    es6: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: ['@vue/prettier'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
