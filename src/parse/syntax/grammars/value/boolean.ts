import { Token } from '../../../lexer/tokens';
import { AbstractSyntaxNode, Grammar } from '../../utils/grammar';

export class GrammarBoolean implements Grammar<'boolean'> {
  match (tokens: Token[]): false | AbstractSyntaxNode<'boolean'> {
    const token = tokens[0];
    if (token.type === 'keyword' && ['true', 'false'].includes(token.value)) {
      return {
        type: 'boolean',
        children: [],
        matched: [token],
      };
    }

    return false;
  }
}
