import { describe, it, expect } from 'vitest';
import { toJsonLogic } from '../src';

describe('addition', () => {
  it('parses an addition expression correctly', () => {
    expect(toJsonLogic('1 + 2')).toEqual({
      type: 'addition',
      left: {
        type: 'literal',
        value: 1,
      },
      right: {
        type: 'literal',
        value: 2,
      },
    });
  });
});
