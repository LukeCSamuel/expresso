import { Token } from '../../lexer/tokens';
import { matchCommentsAndWhitespace } from '../utils/comments-and-whitespace';
import { AbstractSyntaxNode, Grammar, compose } from '../utils/grammar';
import { ParsingContext } from '../utils/parsing-context';
import { Lambda } from './lambda';
import { LogicalCoercion } from './operators/unary-postfix';


/**
 * A special kind of left fragment that handles postfix operators
 */
export class PostfixFragment implements Grammar<'leftFragment'> {
  grammar: Grammar<'leftFragment'>;
  lambdaOnly: Grammar<'leftFragment'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('leftFragment')`
    |${context.get(LogicalCoercion)}${context.get(PostfixFragment)}
    |${context.get(Lambda)}
    `;

    this.lambdaOnly = compose('leftFragment')`
    |${context.get(Lambda)}
    `;
  }

  match (tokens: Token[]): false | AbstractSyntaxNode<'leftFragment'> {
    const matched = matchCommentsAndWhitespace(tokens);
    const remaining = tokens.slice(matched.length);
    if (remaining.length === 0) {
      // match lambda because there is nothing left to attempt to match on
      const result = this.lambdaOnly.match(remaining);
      if (result) {
        return {
          type: 'leftFragment',
          children: result.children,
          matched: matched,
        };
      } else {
        return false;
      }
    } else {
      const result = this.grammar.match(remaining);

      if (result) {
        matched.push(...result.matched);
        return {
          type: 'leftFragment',
          children: result.children,
          matched,
        };
      } else {
        return false;
      }
    }
  }
}
