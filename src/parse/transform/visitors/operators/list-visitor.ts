import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { ListExpression } from '../../expressions/list';
import { VisitorBase } from '../../visitor-registry';

export class ListVisitor extends VisitorBase<'list', ListExpression> {
  type = 'list' as const;
  visit (ast: AbstractSyntaxNode<'list'>): ListExpression {
    const entries = ast.children.map(child => this.registry.visit(child));
    return {
      type: 'list',
      entries,
    };
  }
}
