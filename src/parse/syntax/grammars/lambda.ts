import { AbstractSyntaxNode, Grammar } from '../utils/grammar';

/**
 * Lambda is the representation of nothing
 */
export class Lambda implements Grammar<'lambda'> {
  match (): false | AbstractSyntaxNode<'lambda'> {
    return {
      type: 'lambda',
      children: [],
      matched: [],
    };
  }
}
