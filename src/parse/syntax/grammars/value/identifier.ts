import { Token } from '../../../lexer/tokens';
import { AbstractSyntaxNode, Grammar } from '../../utils/grammar';

export class Identifier implements Grammar<'identifier'> {
  match (tokens: Token[]): false | AbstractSyntaxNode<'identifier'> {
    const token = tokens[0];
    if (token.type === 'identifier') {
      return {
        type: 'identifier',
        children: [],
        matched: [token],
      };
    }

    return false;
  }
}
