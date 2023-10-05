import { Token } from '../../../lexer/tokens';
import { AbstractSyntaxNode, Grammar } from '../../utils/grammar';

export class GrammarNumber implements Grammar<'number'> {
  match (tokens: Token[]): false | AbstractSyntaxNode<'number'> {
    const token = tokens[0];
    if (token.type === 'number') {
      return {
        type: 'number',
        children: [],
        matched: [token],
      };
    }

    return false;
  }
}
