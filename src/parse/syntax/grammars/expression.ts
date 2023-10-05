import { Token } from '../../lexer/tokens';
import { prefixCommentsAndWhiteSpace } from '../utils/comments-and-whitespace';
import { AbstractSyntaxNode, Grammar, compose } from '../utils/grammar';
import { ParsingContext } from '../utils/parsing-context';
import { LeftFragment } from './left-fragment';
import { RightFragment } from './right-fragment';

export class Expression implements Grammar<'expression'> {
  grammar: Grammar<'expression'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('expression')`
    |${context.get(LeftFragment)}${context.get(RightFragment)}
    `;
  }

  match(tokens: Token[]): false | AbstractSyntaxNode<'expression'> {
    return prefixCommentsAndWhiteSpace(tokens, this.grammar);
  }
}
