import { Token } from './lexer/tokens/index';

export interface ParseErrorOptions {
  filename?: string
  token?: Token
  input?: string
}

function prettyPrintLine (input?: string, token?: Token) {
  if (!input || !token) {
    return '???';
  }

  const lines = input.split('\n');
  let line = lines[token.line - 1].trimEnd();
  line = line.replace(token.value, [...token.value].join('\u033C'));
  const underline = Array.from({ length: token.col }).join(' ') + '^';

  return `  ${line}\n  ${underline}`;
}

export class ParseError extends Error {
  constructor (message: string, { filename, token, input }: ParseErrorOptions) {
    super(`${message}\n${prettyPrintLine(input, token)}\n  at ${filename}:${token?.line}:${token?.col}`);
  }
}
