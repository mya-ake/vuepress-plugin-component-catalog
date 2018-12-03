import { getDirPathnames, getFilePathnames } from './../../utils/file';
import { DirContext } from 'src/types';

const isIncludeVueFile = (dirPathname: string): boolean => {
  return (
    getFilePathnames(dirPathname, {
      deep: false,
      include: ['**/*.vue', '*.vue'],
    }).length > 0
  );
};

export default ({ dirContext }: { dirContext: DirContext }) => {
  const { rootDir, include, exclude } = dirContext;
  const dirPathnames = getDirPathnames(rootDir, {
    include,
    exclude,
  }).filter(isIncludeVueFile);
  return [
    [
      '@vuepress/register-components',
      {
        componentsDir: dirPathnames,
      },
    ],
  ];
};
