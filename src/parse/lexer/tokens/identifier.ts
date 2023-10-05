export type IdentifierTokenType = 'identifier'

export type IdentifierToken = {
  type: IdentifierTokenType
  value: string
}

export function tryIdentifierToken (input: string): IdentifierToken | false {
  const matches = input.match(/^[$A-Z_a-z][\w$]*/);
  if (matches) {
    return {
      type: 'identifier',
      value: matches[0],
    };
  } else {
    return false;
  }
}
