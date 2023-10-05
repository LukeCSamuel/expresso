import { describe, it, expect } from 'vitest';
import { toJsonLogic } from '../src';

describe('addition', () => {
  const expression = 'not (a + b + "foo" * 1.2) + true';

  it('parses an addition expression correctly', () => {
    expect(toJsonLogic(expression)).toContainEqual({});
  });
});
