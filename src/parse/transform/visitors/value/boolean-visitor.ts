import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { LiteralExpression } from '../../expressions/literal';
import { VisitorBase } from '../../visitor-registry';

export class BooleanVisitor extends VisitorBase<'boolean', LiteralExpression<boolean>> {
  type = 'boolean' as const;
  visit (ast: AbstractSyntaxNode<'boolean'>): LiteralExpression<boolean> {
    const [token] = ast.matched;
    return {
      type: 'literal',
      value: token.value === 'true',
    };
  }
}
