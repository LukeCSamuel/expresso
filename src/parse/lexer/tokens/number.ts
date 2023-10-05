export type NumberTokenType = 'number'

export type NumberToken = {
  type: NumberTokenType
  value: string
}

export function tryNumberToken (input: string): NumberToken | false {
  const matches = input.match(/^(?:0x[\dA-Fa-f]+|0b[01]+|\d+(?:\.\d*)?)/);
  if (matches) {
    return {
      type: 'number',
      value: matches[0],
    };
  } else {
    return false;
  }
}
