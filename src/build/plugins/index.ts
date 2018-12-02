import { getDirPathnames } from './../../utils/file';

export default (componentsDir: string) => {
  return [
    [
      '@vuepress/register-components',
      {
        componentsDir: [componentsDir, ...getDirPathnames(componentsDir)],
      },
    ],
  ];
};
