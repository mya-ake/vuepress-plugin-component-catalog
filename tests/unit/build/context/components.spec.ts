import {
  divideByDirectory,
  buildLink,
} from './../../../../src/build/context/components';

describe('build/context/components', () => {
  describe('divideByDirectory function', () => {
    it('divided', () => {
      const componentsDir = '/project/components';
      const filePathnames = [
        '/project/components/Component1.vue',
        '/project/components/atoms/Component2.vue',
        '/project/components/atoms/Component3.vue',
        '/project/components/molecules/Component4.vue',
      ];

      const dividedPathnames = divideByDirectory({
        componentsDir,
        filePathnames,
      });

      expect(dividedPathnames.get('/')).toEqual([
        {
          name: 'Component1',
          fileName: 'Component1.vue',
          absolutePathname: '/project/components/Component1.vue',
          relativePathname: '/Component1.vue',
        },
      ]);
      expect(dividedPathnames.get('/atoms/')).toEqual([
        {
          name: 'Component2',
          fileName: 'Component2.vue',
          absolutePathname: '/project/components/atoms/Component2.vue',
          relativePathname: '/atoms/Component2.vue',
        },
        {
          name: 'Component3',
          fileName: 'Component3.vue',
          absolutePathname: '/project/components/atoms/Component3.vue',
          relativePathname: '/atoms/Component3.vue',
        },
      ]);
      expect(dividedPathnames.get('/molecules/')).toEqual([
        {
          name: 'Component4',
          fileName: 'Component4.vue',
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
