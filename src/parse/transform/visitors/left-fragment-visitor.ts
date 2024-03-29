import { AbstractSyntaxNode } from '../../syntax/utils/grammar';
import { Expression } from '../expressions';
import { VisitorBase } from '../visitor-registry';

export class LeftFragmentVisitor extends VisitorBase<'leftFragment', Expression> {
  type = 'leftFragment' as const;
  visit (ast: AbstractSyntaxNode<'leftFragment'>): Expression {
    const [context, postfix] = ast.children;
    const visitedContext = this.registry.visit(context);
    return postfix ? this.registry.visit(postfix, visitedContext) : visitedContext;
  }
}
