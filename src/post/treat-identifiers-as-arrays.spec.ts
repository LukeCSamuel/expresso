import { describe, expect, it } from 'vitest';
import { treatIdentifiersAsArrays } from './treat-identifiers-as-arrays';
import { RulesLogic } from 'json-logic-js';

describe('treatIdentifiersAsArrays', () => {
  it('handles "foo in [1, 2, 3]"', () => {
    const expression = {
      in: [{ var: 'foo' }, [1, 2, 3]],
    } as RulesLogic;
    treatIdentifiersAsArrays(expression);
    expect(expression).toEqual({
      some: [{ var: 'foo' }, { in: [{ var: '' }, [1, 2, 3]] }],
    });
  });

  it('handles "1 in foo"', () => {
    const expression = {
      in: [1, { var: 'foo' }],
    } as RulesLogic;
    treatIdentifiersAsArrays(expression);
    expect(expression).toEqual({
      some: [{ var: 'foo' }, { in: [1, { var: '' }]}],
    });
  });

  it('handles "foo = "bar""', () => {
    const expression = {
      '===': [{ var: 'foo' }, 'bar'],
    } as RulesLogic;
    treatIdentifiersAsArrays(expression);
    expect(expression).toEqual({
      some: [{ var: 'foo' }, { '===': [{ var: '' }, 'bar'] }],
    });
  });
});
