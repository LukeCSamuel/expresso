import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { Expression } from '../../expressions';
import { LiteralExpression } from '../../expressions/literal';
import { MultiplicationExpression } from '../../expressions/multiplication';
import { Swappable, checkPrecedence } from '../../precedence';
import { VisitorBase } from '../../visitor-registry';

export class MultiplicationVisitor extends VisitorBase<'multiplication', Expression> {
  type = 'multiplication' as const;
  visit (ast: AbstractSyntaxNode<'multiplication'>, context?: Expression | undefined): Expression {
    // if context isn't defined, we define it to be the literal one
    context ??= {
      type: 'literal',
      value: 1,
    } as LiteralExpression<number>;

    const [right] = ast.children;
    const rightTransform = this.registry.visit(right);

    // create multiplication expression
    const multiplication: Swappable = {
      type: 'multiplication',
      left: context,
      right: rightTransform,
    } as MultiplicationExpression;

    return checkPrecedence(multiplication);
  }
}
