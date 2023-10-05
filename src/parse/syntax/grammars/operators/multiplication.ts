import { Token } from '../../../lexer/tokens';
import { AbstractSyntaxNode, Grammar, compose } from '../../utils/grammar';
import { ParsingContext } from '../../utils/parsing-context';
import { LeftFragment } from '../left-fragment';

export class Multiplication implements Grammar<'multiplication'> {
  grammar: Grammar<'multiplication'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('multiplication')`
    |${context.get(LeftFragment)}
    `;
  }
  match (tokens: Token[]): false | AbstractSyntaxNode<'multiplication'> {
    const times = tokens[0];

    if (times.type !== 'operator' || times.value !== '*') {
      return false;
    }

    const matched = [times] as Token[];
    const result = this.grammar.match(tokens.slice(matched.length));

    if (result) {
      matched.push(...result.matched);
      return {
        type: 'multiplication',
        children: result.children,
        matched,
      };
    } else {
      return false;
    }
  }
}
