import { Token } from '../../../lexer/tokens';
import { ParseError } from '../../../parse-error';
import { AbstractSyntaxNode, Grammar, compose } from '../../utils/grammar';
import { ParsingContext } from '../../utils/parsing-context';
import { Expression } from '../Expression';

/**
 * An expression wrapped in parenthesis
 */
export class Group implements Grammar<'group'> {
  grammar: Grammar<'group'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('group')`
    |${context.get(Expression)}
    `;
  }

  match (tokens: Token[]): false | AbstractSyntaxNode<'group'> {
    const open = tokens[0];

    if (open.type !== 'paren' || open.value !== '(') {
      return false;
    }

    const matched = [open] as Token[];
    const result = this.grammar.match(tokens.slice(1));

    if (result) {
      matched.push(...result.matched);
      const close = tokens[matched.length];
      matched.push(close);
      if (!close || close.type !== 'paren' || close.value !== ')') {
        throw new ParseError('Expected Closing Parenthesis ")"', {
          filename: this.context.filename,
          input: this.context.input,
          token: close,
        });
      } else {
        return {
          type: 'group',
          children: result.children,
          matched,
        };
      }
    } else {
      return false;
    }
  }
}
