import { Token } from '../../lexer/tokens';
import { AbstractSyntaxNode, Grammar } from './grammar';

export function matchCommentsAndWhitespace (tokens: Token[]): Token[] {
  const matched = [] as Token[];
  for (const token of tokens) {
    if (token.type === 'whitespace' || token.type === 'comment') {
      matched.push(token);
    } else {
      break;
    }
  }

  return matched;
}

export function prefixCommentsAndWhiteSpace<T extends string = string> (tokens: Token[], grammar: Grammar<T>): false | AbstractSyntaxNode<T> {
  const ignored = matchCommentsAndWhitespace(tokens);
  const result = grammar.match(tokens.slice(ignored.length));
  if (result) {
    result.matched.unshift(...ignored);
  }
  return result;
}
