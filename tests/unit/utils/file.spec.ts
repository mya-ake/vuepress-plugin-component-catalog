import { isMatchPathname } from './../../../src/utils/file';

describe('utils/file', () => {
  describe('minimatch function', () => {
    it('true', () => {
      const globs = ['**/node_modules/**'];
      const result = isMatchPathname('/project/node_modules/test.js', globs);
      expect(result).toBe(true);
    });

    it('false', () => {
      const globs = ['**/node_modules/**'];
      const result = isMatchPathname(
        '/project/components/Component1.vue',
        globs,
      );
      expect(result).toBe(false);
    });
  });
});
