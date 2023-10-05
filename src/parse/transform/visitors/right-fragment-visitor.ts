import { AbstractSyntaxNode } from '../../syntax/utils/grammar';
import { Expression } from '../expressions';
import { VisitorBase } from '../visitor-registry';

export class RightFragmentVisitor extends VisitorBase<'rightFragment', Expression> {
  type = 'rightFragment' as const;
  visit (ast: AbstractSyntaxNode<'rightFragment'>, context?: Expression | undefined): Expression {
    const [left, right] = ast.children;

    // visit the left fragment first
    const leftTransform = this.registry.visit(left, context);
    
    // check if the right fragment exists, if so, pass the lefts fragment
    if (right) {
      return this.registry.visit(right, leftTransform);
    }

    return leftTransform;
  }

}
