import { Token } from '../../../lexer/tokens';
import { AbstractSyntaxNode, Grammar } from '../../utils/grammar';

export class GrammarString implements Grammar<'string'> {
  match (tokens: Token[]): false | AbstractSyntaxNode<'string'> {
    const token = tokens[0];
    if (token.type === 'string') {
      return {
        type: 'string',
        children: [],
        matched: [token],
      };
    }

    return false;
  }
}
