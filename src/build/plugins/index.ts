import {
  getDirPathnamesWithFilter,
  getFilePathnamesWithFilter,
} from './../../utils/file';
import { DirContext } from 'src/types';

const isIncludeVueFile = (dirPathname: string): boolean => {
  return (
    getFilePathnamesWithFilter(dirPathname, {
      deep: false,
      include: ['**/*.vue', '*.vue'],
    }).length > 0
  );
};

export default ({ dirContext }: { dirContext: DirContext }) => {
  const { rootDir, include, exclude } = dirContext;
  const dirPathnames = getDirPathnamesWithFilter(rootDir, {
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
