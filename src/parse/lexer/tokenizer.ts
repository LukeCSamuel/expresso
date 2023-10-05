import { Token, tryToken } from './tokens';
import { ParseError } from '../parse-error';

function computeLineNumber (input: string, cursor: number) {
  let lastLine = 0;
  let lines = 1;
  for (let i = 0; i < cursor; i++) {
    if (input[i] === '\n') {
      lines++;
      lastLine = i + 1;
    }
  }

  const col = cursor - lastLine + 1;
  return [lines, col];
}

export interface TokenizeOptions {
  input: string
  filename?: string
}

export function tokenize ({ input, filename }: TokenizeOptions) {
  let cursor = 0;
  const tokens: Token[] = [];

  while (cursor < input.length) {
    const remaining = input.slice(Math.max(0, cursor));
    const token = tryToken(remaining);

    const [line, col] = computeLineNumber(input, cursor);
    const metaToken = {
      ...token,
      line,
      col,
    };

    if (metaToken.type === 'unknown') {
      throw new ParseError(`Unexpected Token ("${token.value}")`, {
        filename,
        token: metaToken,
        input,
      });
    }

    cursor += token.value.length;
    tokens.push(metaToken);
  }

  return tokens;
}
