/* eslint-disable unicorn/no-null */
import { describe, it, expect } from 'vitest';
import { ExpressoOptions, expresso } from '../src';


describe('values', () => {
  const options: ExpressoOptions = {
    logErrors: true,
  };

  it('compiles literals correctly', () => {
    const { jsonLogic } = expresso('1 + "hello" + \'world\' + true + false + null', options);
    expect(jsonLogic).toEqual({
      '+': [
        {
          '+': [
            {
              '+': [
                {
                  '+': [
                    {
                      '+': [
                        1,
                        'hello',
                      ],
                    },
                    'world',
                  ],
                },
                true,
              ],
            },
            false,
          ],
        },
        null,
      ],
    });
  });

  it('compiles identifiers correctly', () => {
    const { jsonLogic } = expresso('foo', options);
    expect(jsonLogic).toEqual({
      var: 'foo',
    });
  });
});
