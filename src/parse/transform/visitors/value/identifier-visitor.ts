import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { IdentifierExpression } from '../../expressions/identifier';
import { VisitorBase } from '../../visitor-registry';

export class IdentifierVisitor extends VisitorBase<'identifier', IdentifierExpression> {
  type = 'identifier' as const;
  visit (ast: AbstractSyntaxNode<'identifier'>): IdentifierExpression {
    const [token] = ast.matched;
    return {
      type: 'identifier',
      name: token.value,
    };
  }
}
