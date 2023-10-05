import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { GroupExpression } from '../../expressions/group';
import { VisitorBase } from '../../visitor-registry';

export class GroupVisitor extends VisitorBase<'group', GroupExpression> {
  type = 'group' as const;
  visit (ast: AbstractSyntaxNode<'group'>): GroupExpression {
    const [child] = ast.children;
    return {
      type: 'group',
      expression: this.registry.visit(child),
    };
  }
}
