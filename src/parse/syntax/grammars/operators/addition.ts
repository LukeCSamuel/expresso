import { Token } from '../../../lexer/tokens';
import { AbstractSyntaxNode, Grammar, compose } from '../../utils/grammar';
import { ParsingContext } from '../../utils/parsing-context';
import { LeftFragment } from '../left-fragment';

export class Addition implements Grammar<'addition'> {
  grammar: Grammar<'addition'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('addition')`
    |${context.get(LeftFragment)}
    `;
  }

  match (tokens: Token[]): false | AbstractSyntaxNode<'addition'> {
    const plus = tokens[0];

    if (plus.type !== 'operator' || plus.value !== '+') {
      return false;
    }

    const matched = [plus] as Token[];
    const result = this.grammar.match(tokens.slice(matched.length));

    if (result) {
      matched.push(...result.matched);
      return {
        type: 'addition',
        children: result.children,
        matched,
      };
    } else {
      return false;
    }
  }
}
