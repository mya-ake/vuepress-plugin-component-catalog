import path from 'path';
import {
  getDirPathnamesWithFilter,
  getFilePathnamesWithFilter,
} from './../../utils/file';
import {
  DirContext,
  ProjectEnviromentContext,
  VuePressComponent,
} from 'src/types';

const DIST_DIR = path.resolve(__dirname, '..', '..');
const MOCK_COMPONENTS_DIR = path.join(DIST_DIR, 'mocks', 'components');

const isIncludeVueFile = (dirPathname: string): boolean => {
  return (
    getFilePathnamesWithFilter(dirPathname, {
      deep: false,
      include: ['**/*.vue', '*.vue'],
    }).length > 0
  );
};

export default ({
  dirContext,
  environment,
}: {
  dirContext: DirContext;
  environment: ProjectEnviromentContext;
}) => {
  const { rootDir, include, exclude } = dirContext;
  const dirPathnames = getDirPathnamesWithFilter(rootDir, {
    include,
    exclude,
  }).filter(isIncludeVueFile);

  // enviroment components
  const components: VuePressComponent[] = [];
  if (environment.nuxt) {
    const nuxtDir = path.join(MOCK_COMPONENTS_DIR, 'nuxt');
    components.push({
      name: 'nuxt-link',
      path: path.join(nuxtDir, 'nuxt-link.js'),
    });
    components.push({
      name: 'no-ssr',
      path: path.join(nuxtDir, 'no-ssr.js'),
    });
  }

  return [
    [
      '@vuepress/register-components',
      {
        componentsDir: dirPathnames,
        components,
      },
    ],
  ];
};
