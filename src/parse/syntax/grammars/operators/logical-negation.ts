import { Token } from '../../../lexer/tokens';
import { AbstractSyntaxNode, Grammar, compose } from '../../utils/grammar';
import { ParsingContext } from '../../utils/parsing-context';
import { Expression } from '../Expression';

export class LogicalNegation implements Grammar<'logicalNegation'> {
  grammar: Grammar<'logicalNegation'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('logicalNegation')`
    |${context.get(Expression)}
    `;
  }

  match (tokens: Token[]): false | AbstractSyntaxNode<'logicalNegation'> {
    const not = tokens[0];

    if (not.type !== 'keyword' || not.value !== 'not') {
      return false;
    }

    const matched = [not] as Token[];
    const result = this.grammar.match(tokens.slice(matched.length));

    if (result) {
      matched.push(...result.matched);
      return {
        type: 'logicalNegation',
        children: result.children,
        matched,
      };
    } else {
      return false;
    }
  }
}
