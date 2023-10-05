import { Token } from '../../lexer/tokens';
import { matchCommentsAndWhitespace } from '../utils/comments-and-whitespace';
import { AbstractSyntaxNode, Grammar, compose } from '../utils/grammar';
import { ParsingContext } from '../utils/parsing-context';
import { Lambda } from './lambda';
import { Addition } from './operators/addition';
import { Multiplication } from './operators/multiplication';

/**
 * A RightFragment is a right-recursive fragment of an expression
 */
export class RightFragment implements Grammar<'rightFragment'> {
  grammar: Grammar<'rightFragment'>;
  lambdaOnly: Grammar<'rightFragment'>;

  constructor (
    public context: ParsingContext,
  ) {
    this.grammar = compose('rightFragment')`
    |${context.get(Multiplication)}${context.get(RightFragment)}
    |${context.get(Addition)}${context.get(RightFragment)}
    |${context.get(Lambda)}
    `;

    this.lambdaOnly = compose('rightFragment')`
    |${context.get(Lambda)}
    `;
  }

  match (tokens: Token[]): false | AbstractSyntaxNode<'rightFragment'> {
    const matched = matchCommentsAndWhitespace(tokens);
    const remaining = tokens.slice(matched.length);
    if (remaining.length === 0) {
      // match lambda because there is nothing left to attempt to match on
      const result = this.lambdaOnly.match(remaining);
      if (result) {
        return {
          type: 'rightFragment',
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
          type: 'rightFragment',
          children: result.children,
          matched,
        };
      } else {
        return false;
      }
    }
  }
}
