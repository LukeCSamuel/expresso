export type BracketTokenType = 'bracket'

export type BracketToken = {
  type: BracketTokenType
  value: '[' | ']'
}

export function tryBracketToken (input: string): BracketToken | false {
  // eslint-disable-next-line unicorn/better-regex
  const matches = input.match(/^(?:\[|\])/);
  if (matches) {
    return {
      type: 'bracket',
      value: matches[0] as '[' | ']',
    };
  } else {
    return false;
  }
}
