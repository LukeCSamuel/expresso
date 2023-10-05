import { Token } from '../../../lexer/tokens';
import { prefixCommentsAndWhiteSpace } from '../../utils/comments-and-whitespace';
import { AbstractSyntaxNode, Grammar, compose } from '../../utils/grammar';
import { ParsingContext } from '../../utils/parsing-context';
import { GrammarBoolean } from './boolean';
import { Identifier } from './identifier';
import { Null } from './null';
import { GrammarNumber } from './number';
import { GrammarString } from './string';

/**
 * A `Value` is a reference to some data
 */
export class Value implements Grammar<'value'> {
  grammar: Grammar<'value'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('value')`
    |${context.get(Null)}
    |${context.get(GrammarBoolean)}
    |${context.get(GrammarNumber)}
    |${context.get(GrammarString)}
    |${context.get(Identifier)}
    `;
  }

  match (tokens: Token[]): false | AbstractSyntaxNode<'value'> {
    return prefixCommentsAndWhiteSpace(tokens, this.grammar);
  }
}
