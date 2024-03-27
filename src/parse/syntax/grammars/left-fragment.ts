import { Token } from '../../lexer/tokens';
import { prefixCommentsAndWhiteSpace } from '../utils/comments-and-whitespace';
import { AbstractSyntaxNode, Grammar, compose } from '../utils/grammar';
import { ParsingContext } from '../utils/parsing-context';
import { Group } from './operators/group';
import { List } from './operators/list';
import { LogicalNegation, Missing, NumericalCoercion, NumericalNegation } from './operators/unary-prefix';
import { PostfixFragment } from './postfix-fragment';
import { Value } from './value/value';

/**
 * A LeftFragment is a complete expression that has not yet considered the existence of any RightFragment
 */
export class LeftFragment implements Grammar<'leftFragment'> {
  grammar: Grammar<'leftFragment'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('leftFragment')`
    |${context.get(LogicalNegation)}${context.get(PostfixFragment)}
    |${context.get(NumericalNegation)}${context.get(PostfixFragment)}
    |${context.get(NumericalCoercion)}${context.get(PostfixFragment)}
    |${context.get(Missing)}${context.get(PostfixFragment)}
    |${context.get(Group)}${context.get(PostfixFragment)}
    |${context.get(List)}${context.get(PostfixFragment)}
    |${context.get(Value)}${context.get(PostfixFragment)}
    `;
  }

  match (tokens: Token[]): false | AbstractSyntaxNode<'leftFragment'> {
    return prefixCommentsAndWhiteSpace(tokens, this.grammar);
  }
}
