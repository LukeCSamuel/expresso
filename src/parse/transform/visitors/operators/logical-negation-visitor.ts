import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { Expression } from '../../expressions';
import { LogicalNegationExpression } from '../../expressions/logical-negation';
import { checkPrecedence } from '../../precedence';
import { VisitorBase } from '../../visitor-registry';

export class LogicalNegationVisitor extends VisitorBase<'logicalNegation', Expression> {
  type = 'logicalNegation' as const;
  visit (ast: AbstractSyntaxNode<'logicalNegation'>): Expression {
    const [child] = ast.children;
    const top = {
      type: 'logicalNegation',
      expression: this.registry.visit(child),
    } as LogicalNegationExpression;
    return checkPrecedence(top);
  }
}
