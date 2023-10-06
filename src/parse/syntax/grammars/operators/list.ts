import { Token } from '../../../lexer/tokens';
import { ParseError } from '../../../parse-error';
import { define } from '../../utils/define';
import { AbstractSyntaxNode, Grammar } from '../../utils/grammar';
import { ParsingContext } from '../../utils/parsing-context';
import { Expression } from '../Expression';

export const ListEntry = define('list')
  .as(() => Expression, ['operator', ','], () => ListEntry)
  .or(() => Expression);

export class List implements Grammar<'list'> {
  grammar: Grammar<'list'>;
  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = context.get(ListEntry);
  }

  match (tokens: Token[]): false | AbstractSyntaxNode<'list'> {
    const open = tokens[0];

    if (open.type !== 'bracket' || open.value !== '[') {
      return false;
    }

    const matched = [open] as Token[];
    const result = this.grammar.match(tokens.slice(matched.length));

    if (result) {
      matched.push(...result.matched);
      const close = tokens[matched.length];
      matched.push(close);
      if (!close || close.type !== 'bracket' || close.value !== ']') {
        throw new ParseError('Expected Closing Bracket "]"', {
          filename: this.context.filename,
          input: this.context.input,
          token: close,
        });
      } else {
        return {
          type: 'list',
          children: result.children,
          matched,
        };
      }
    } else {
      return false;
    }
  }
}
