import { describe, it, expect } from 'vitest';
import { ExpressoOptions, expresso } from '../src';


describe('arithmetic', () => {
  const options: ExpressoOptions = {
    logErrors: true,
  };

  describe('addition', () => {
    it('compiles an addition expression correctly', () => {
      const { jsonLogic } = expresso('1 + 2', options);
      expect(jsonLogic).toEqual({
        '+': [1, 2],
      });
    });
  
    it('compiles multiple addition correctly', () => {
      const { jsonLogic } = expresso('1 + 2 + 3', options);
      expect(jsonLogic).toEqual({
        '+': [{ '+': [1, 2] }, 3],
      });
    });
  });

  describe('subtraction', () => {
    it('compiles subtraction correctly', () => {
      const { jsonLogic } = expresso('1 - 2', options);
      expect(jsonLogic).toEqual({
        '-': [1, 2],
      });
    });
  });

  describe('multiplication', () => {
    it('compiles multiplication correctly', () => {
      const { jsonLogic } = expresso('1 * 2', options);
      expect(jsonLogic).toEqual({
        '*': [1, 2],
      });
    });
  });

  describe('division', () => {
    it('compiles division correctly', () => {
      const { jsonLogic } = expresso('1 / 2', options);
      expect(jsonLogic).toEqual({
        '/': [1, 2],
      });
    });
  });

  describe('precedence', () => {
    it('respects precedence', () => {
      const { jsonLogic } = expresso('1 + 2 * 3', options);
      expect(jsonLogic).toEqual({
        '+': [1, { '*': [2, 3] }],
      });
    });

    it('respects groups', () => {
      const { jsonLogic } = expresso('1 * (2 + 3)', options);
      expect(jsonLogic).toEqual({
        '*': [1, { '+': [2, 3] }],
      });
    });
  });
});
