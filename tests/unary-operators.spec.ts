import { describe, it, expect } from 'vitest';
import { ExpressoOptions, expresso } from '../src';

describe('unary operators', () => {
  const options: ExpressoOptions = {
    logErrors: true,
  };

  describe('missing', () => {
    it('applies the "missing" operator correctly', () => {
      const { jsonLogic } = expresso('missing foo', options);
      expect(jsonLogic).toEqual({
        none: [
          { missing: [{ var: 'foo' }] },
          true,
        ],
      });
    });
  });
});
