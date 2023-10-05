export type ParenTokenType = 'paren'

export type ParenToken = {
  type: ParenTokenType
  value: '(' | ')'
}

export function tryParenToken (input: string): ParenToken | false {
  const matches = input.match(/^[()]/);
  if (matches) {
    return {
      type: 'paren',
      value: matches[0] as '(' | ')',
    };
  } else {
    return false;
  }
}
