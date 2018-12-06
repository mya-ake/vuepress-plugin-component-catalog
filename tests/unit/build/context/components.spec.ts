import {
  divideByDirectory,
  buildLink,
} from './../../../../src/build/context/components';

describe('build/context/components', () => {
  describe('divideByDirectory function', () => {
    it('divided', () => {
      const rootDir = '/project/components';
      const filePathnames = [
        '/project/components/Component1.vue',
        '/project/components/atoms/Component2.vue',
        '/project/components/atoms/Component3.vue',
        '/project/components/molecules/Component4.vue',
      ];

      const dividedPathnames = divideByDirectory({
        rootDir,
        filePathnames,
      });

      expect(dividedPathnames.get('/')).toEqual([
        {
          name: 'Component1',
          fileName: 'Component1.vue',
          dirName: '/',
          absolutePathname: '/project/components/Component1.vue',
          relativePathname: '/Component1.vue',
        },
      ]);
      expect(dividedPathnames.get('/atoms/')).toEqual([
        {
          name: 'Component2',
          fileName: 'Component2.vue',
          dirName: '/atoms/',
          absolutePathname: '/project/components/atoms/Component2.vue',
          relativePathname: '/atoms/Component2.vue',
        },
        {
          name: 'Component3',
          fileName: 'Component3.vue',
          dirName: '/atoms/',
          absolutePathname: '/project/components/atoms/Component3.vue',
          relativePathname: '/atoms/Component3.vue',
        },
      ]);
      expect(dividedPathnames.get('/molecules/')).toEqual([
        {
          name: 'Component4',
          fileName: 'Component4.vue',
          dirName: '/molecules/',
          absolutePathname: '/project/components/molecules/Component4.vue',
          relativePathname: '/molecules/Component4.vue',
        },
      ]);
    });
  });

  describe('buildLink function', () => {
    it('get builded link', () => {
      const name = 'TestComponent';
      const relativePathname = '/atoms/TestComponent.vue';
      const distDirPrefix = 'components';
      const link = buildLink({ name, relativePathname, distDirPrefix });
      expect(link).toBe('/components/atoms/test-component/');
    });
  });
});
