import { describe, it, expect } from 'vitest';
import { ExpressoOptions, expresso } from '../src';

describe('logical operators', () => {
  const options: ExpressoOptions = {
    logErrors: true,
  };

  describe('not', () => {
    it('applies the "!" operator correctly', () => {
      const { jsonLogic } = expresso('not foo', options);
      expect(jsonLogic).toEqual({
        '!': [{ var: 'foo' }],
      });
    });
  });

  describe('exists', () => {
    it('applies the "!!" operator correctly', () => {
      const { jsonLogic } = expresso('foo exists', options);
      expect(jsonLogic).toEqual({
        '!!': [{ var: 'foo' }],
      });
    });

    it('applies precedence correctly', () => {
      const { jsonLogic } = expresso('not foo exists and bar exists', options);
      expect(jsonLogic).toEqual({
        and: [
          { '!': [{ '!!': [{ var: 'foo' }] }] },
          { '!!': [{ var: 'bar' }] },
        ],
      });
    });
  });

  describe('and', () => {
    it('applies the "and" operator correctly', () => {
      const { jsonLogic } = expresso('foo and bar and baz', options);
      expect(jsonLogic).toEqual({
        and: [
          {
            and: [
              { var: 'foo' },
              { var: 'bar' },
            ],
          },
          { var: 'baz' },
        ],
      });
    });
  });

  describe('=', () => {
    it('applies the "===" operator correctly', () => {
      const { jsonLogic } = expresso('foo = bar', options);
      expect(jsonLogic).toEqual({
        '===': [{ var: 'foo' }, { var: 'bar' }],
      });
    });
  });

  describe('!=', () => {
    it('applies the "!==" operator correctly', () => {
      const { jsonLogic } = expresso('foo != bar', options);
      expect(jsonLogic).toEqual({
        '!==': [{ var: 'foo' }, { var: 'bar' }],
      });
    });
  });
});
