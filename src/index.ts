import { RulesLogic } from 'json-logic-js';
import { generate } from './generate/generate';
import { tokenize } from './parse/lexer/tokenizer';
import { ParseError } from './parse/parse-error';
import { Expression } from './parse/syntax/grammars/Expression';
import { Expression as SemanticExpression } from './parse/transform/expressions';
import { ParsingContext } from './parse/syntax/utils/parsing-context';
import { transform } from './parse/transform/transformer';
import { PostCompilationTransform } from './post';
import { Token } from './parse/lexer/tokens';
import { AbstractSyntaxNode } from './parse/syntax/utils/grammar';

export interface ExpressoOptions {
  logErrors?: boolean
  throwParseErrors?: boolean
  throwAllErrors?: boolean
  postCompile?: PostCompilationTransform[]
  outputs?: {
    jsonLogic?: boolean
    tokens?: boolean
    abstractSyntaxTree?: boolean
    semanticExpressionTree?: boolean
  }
}

export interface ExpressoOutput {
  jsonLogic?: RulesLogic
  tokens?: Token[]
  abstractSyntaxTree?: AbstractSyntaxNode
  semanticExpressionTree?: SemanticExpression
}

export function expresso (input: string, options?: ExpressoOptions) {
  const result = {} as ExpressoOutput;
  try {
    // Tokenize the input string
    const tokens = tokenize({ input });
    if (options?.outputs?.tokens) {
      result.tokens = tokens;
    }

    // Parse tokens into an Abstract Syntax Tree
    const value = new Expression(new ParsingContext({ input }));
    const ast = value.match(tokens);

    if (ast) {
      if (options?.outputs?.abstractSyntaxTree) {
        result.abstractSyntaxTree = ast;
      }

      // Transform AST into Semantic Expression Tree
      const set = transform(ast);
      if (options?.outputs?.semanticExpressionTree) {
        result.semanticExpressionTree = set;
      }

      // Generate JsonLogic from the SET
      const jsonLogic = generate(set);

      // Apply post-compilation transforms to the JsonLogic
      if (options?.postCompile) {
        for (const postCompileFunc of options.postCompile) {
          postCompileFunc(jsonLogic);
        }
      }

      if (options?.outputs?.jsonLogic !== false) {
        result.jsonLogic = jsonLogic;
      }
    } else {
      throw new Error('Failed to generate AST.');
    }
  } catch (error: unknown) {
    if (options?.logErrors) {
      if (error instanceof Error) {
        console.error(error.message);
        if (!(error instanceof ParseError)) {
          console.error(error.stack);
        }
      } else {
        console.error(error);
      }
    }

    if (options?.throwParseErrors && error instanceof ParseError) {
      throw error;
    }

    if (options?.throwAllErrors) {
      throw error;
    }
  }

  return result;
}
