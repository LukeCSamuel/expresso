export type StringTokenType = 'string'

export type StringToken = {
  type: StringTokenType
  value: string
}

export function tryStringToken (input: string): StringToken | false {
  const firstChar = input[0];
  if (firstChar === '\'' || firstChar === '"') {
    let escaped = false;

    for (let cursor = 1; cursor < input.length; cursor++) {
      if (escaped) {
        continue;
      }

      if (input[cursor] === '\\') {
        escaped = true;
        continue;
      }

      if (input[cursor] === firstChar) {
        return {
          type: 'string',
          value: input.slice(0, Math.max(0, cursor + 1)),
        };
      }
    }
  }

  return false;
}
