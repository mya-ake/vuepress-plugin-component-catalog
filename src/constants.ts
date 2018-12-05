export const NAME = 'vuepress-plugin-component-catalog';
export const DIST_DEFAULT_PREFIX = 'components';

export const EXCLUDE = {
  DEFAULT: [
    '**/node_modules/**',
    'node_modules/**',
    'node_modules',
    '**/dist/**',
    'dist/**',
    'dist',
    '**/.vuepress/**',
    '.vuepress/**',
    '.vuepress',
    '**/.git/**',
    '.git/**',
    '.git',
  ],
  NUXT: ['**/.nuxt/**', '.nuxt/**', '.nuxt'],
};

export const NUXT_DIR = {
  ASSETS: 'assets',
  STATIC: 'static',
};
