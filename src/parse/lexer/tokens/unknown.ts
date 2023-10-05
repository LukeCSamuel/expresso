export type UnknownTokenType = 'unknown'

export type UnknownToken = {
  type: UnknownTokenType
  value: string
}

export function createUnknownToken (input: string): UnknownToken {
  return {
    type: 'unknown',
    value: input.charAt(0),
  };
}
