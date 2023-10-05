import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { IdentifierExpression } from '../../expressions/identifier';
import { LiteralExpression } from '../../expressions/literal';
import { VisitorBase } from '../../visitor-registry';

export class ValueVisitor extends VisitorBase<'value', LiteralExpression | IdentifierExpression> {
  type = 'value' as const;
  visit (ast: AbstractSyntaxNode<'value'>): LiteralExpression | IdentifierExpression {
    const [child] = ast.children;
    return this.registry.visit(child) as LiteralExpression | IdentifierExpression;
  }
}
