import { describe, it, expect } from 'vitest';
import { ExpressoOptions, expresso } from '../src';

describe('logical operators', () => {
  const options: ExpressoOptions = {
    logErrors: true,
  };

  describe('exists', () => {
    it('applies the "!!" operator correctly', () => {
      const { jsonLogic } = expresso('foo exists', options);
      expect(jsonLogic).toEqual({
        '!!': [{ var: 'foo' }],
      });
    });
  });
});
