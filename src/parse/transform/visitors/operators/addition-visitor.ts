import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { Expression } from '../../expressions';
import { AdditionExpression } from '../../expressions/addition';
import { LiteralExpression } from '../../expressions/literal';
import { Swappable, checkPrecedence } from '../../precedence';
import { VisitorBase } from '../../visitor-registry';

export class AdditionVisitor extends VisitorBase<'addition', Expression> {
  type = 'addition' as const;
  visit (ast: AbstractSyntaxNode<'addition'>, context?: Expression | undefined): Expression {
    // if context isn't defined, we define it to be the literal zero
    context ??= {
      type: 'literal',
      value: 0,
    } as LiteralExpression<number>;

    const [right] = ast.children;
    const rightTransform = this.registry.visit(right);

    // create addition expression and check precedence
    const addition: Swappable = {
      type: 'addition',
      left: context,
      right: rightTransform,
    } as AdditionExpression;

    return checkPrecedence(addition);
  }
}
