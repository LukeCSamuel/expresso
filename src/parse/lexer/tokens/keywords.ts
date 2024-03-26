export type KeywordTokenType = 'keyword'

export const keywords = [
  'and',
  'or',
  'not',
  'in',
  'contains',
  'true',
  'false',
  'null',
  'missing',
  'exists',
] as const;

const exp = new RegExp(`^(?:${keywords.join('|')})`, 'i');

export type KeywordToken = {
  type: KeywordTokenType
  value: (typeof keywords)[number]
}

export function tryKeywordToken (input: string): KeywordToken | false {
  const matches = input.match(exp);
  if (matches) {
    return {
      type: 'keyword',
      value: matches[0] as (typeof keywords)[number],
    };
  } else {
    return false;
  }
}
