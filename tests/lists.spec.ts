import { describe, it, expect } from 'vitest';
import { ExpressoOptions, expresso } from '../src';

describe('lists', () => {
  const options: ExpressoOptions = {
    logErrors: true,
  };

  it('compiles a list correctly', () => {
    const { jsonLogic } = expresso('[1, 2, 3]', options);
    expect(jsonLogic).toEqual([1, 2, 3]);
  });

  it('applies the "in" operator correctly', () => {
    const { jsonLogic } = expresso('1 in [1, 2, 3]', options);
    expect(jsonLogic).toEqual({
      in: [1, [1, 2, 3]],
    });
  });

  it('applies the "contains" operator correctly', () => {
    const { jsonLogic } = expresso('[1, 2, 3] contains 1');
    expect(jsonLogic).toEqual({
      in: [1, [1, 2, 3]],
    });
  });
});
