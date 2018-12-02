import { camelToHyphen } from './../../../src/utils/common';

describe('utils/common', () => {
  describe('camelToHyphen function', () => {
    it('campl cast to hyphen case', () => {
      const result = camelToHyphen('TestName');
      expect(result).toBe('test-name');
    });
  });
});
