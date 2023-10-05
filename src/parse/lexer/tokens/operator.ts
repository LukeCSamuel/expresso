export type OperatorTokenType = 'operator'

export const operators = [
  ',',
  '+',
  '-',
  '*',
  '/',
  '=',
  '!',
  '<',
  '>',
] as const;

export type OperatorToken = {
  type: OperatorTokenType
  value: (typeof operators)[number]
}

export function tryOperatorToken (input: string): OperatorToken | false {
  if (operators.includes(input[0] as (typeof operators)[number])) {
    return {
      type: 'operator',
      value: input[0] as (typeof operators)[number],
    };
  } else {
    return false;
  }
}
