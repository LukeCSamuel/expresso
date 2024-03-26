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
      const { jsonLogic } = expresso('not foo exists', options);
      expect(jsonLogic).toEqual({
        '!': [{
          '!!': [{ var: 'foo' }],
        }],
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
