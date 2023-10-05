import { AbstractSyntaxNode } from '../../syntax/utils/grammar';
import { Expression } from '../expressions';
import { VisitorBase } from '../visitor-registry';

export class ExpressionVisitor extends VisitorBase<'expression', Expression> {
  type = 'expression' as const;
  visit (ast: AbstractSyntaxNode<'expression'>): Expression {
    const [left, right] = ast.children;

    // visit the left fragment first
    const leftTransform = this.registry.visit(left);

    // pass the left fragment into the visitor for the right fragment
    const rightTransform = this.registry.visit(right, leftTransform);

    return rightTransform;
  }
}
