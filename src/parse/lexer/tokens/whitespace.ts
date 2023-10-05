export type WhitespaceTokenType = 'whitespace'

export type WhitespaceToken = {
  type: WhitespaceTokenType
  value: string
}

export function tryWhitespaceToken (input: string): WhitespaceToken | false {
  const matches = input.match(/^\s+/);
  if (matches) {
    return {
      type: 'whitespace',
      value: matches[0],
    };
  } else {
    return false;
  }
}
