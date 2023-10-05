import { Token } from '../../../lexer/tokens';
import { AbstractSyntaxNode, Grammar } from '../../utils/grammar';

export class Null implements Grammar<'null'> {
  match (tokens: Token[]): false | AbstractSyntaxNode<'null'> {
    const token = tokens[0];
    if (token.type === 'keyword' && token.value === 'null') {
      return {
        type: 'null',
        children: [],
        matched: [token],
      };
    }

    return false;
  }
}
