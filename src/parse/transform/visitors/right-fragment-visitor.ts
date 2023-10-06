import { AbstractSyntaxNode } from '../../syntax/utils/grammar';
import { Expression } from '../expressions';
import { VisitorBase } from '../visitor-registry';

export class RightFragmentVisitor extends VisitorBase<'rightFragment', Expression> {
  type = 'rightFragment' as const;
  visit (ast: AbstractSyntaxNode<'rightFragment'>, context?: Expression | undefined): Expression {
    for (const child of ast.children) {
      context = this.registry.visit(child, context);
    }
    
    if (context) {
      return context;
    } else {
      throw new Error('A "rightFragment" AST node must be visited with context.');
    }
  }

}
