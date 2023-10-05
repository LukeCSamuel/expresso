import { AbstractSyntaxNode } from '../../syntax/utils/grammar';
import { Expression } from '../expressions';
import { VisitorBase } from '../visitor-registry';

export class LambdaVisitor extends VisitorBase<'lambda', Expression> {
  type = 'lambda' as const;
  visit (_: AbstractSyntaxNode<'lambda'>, context?: Expression): Expression {
    if (context) {
      return context;
    } else {
      throw new Error('A lambda AST node must be visited with context.');
    }
  }
}
