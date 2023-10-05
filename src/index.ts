import { tokenize } from './parse/lexer/tokenizer';
import { ParseError } from './parse/parse-error';
import { Expression } from './parse/syntax/grammars/Expression';
import { ParsingContext } from './parse/syntax/utils/parsing-context';
import { transform } from './parse/transform/transformer';

export function toJsonLogic (input: string) {
  try {
    const tokens = tokenize({ input });
    const value = new Expression(new ParsingContext({ input }));
    const ast = value.match(tokens);

    if (ast) {
      const set = transform(ast);
      return set;
    } else {
      throw new Error('Failed to generate AST.');
    }
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      if (!(error instanceof ParseError)) {
        console.error(error.stack);
      }
    } else {
      console.error(error);
    }
  }
}
