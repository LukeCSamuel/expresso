import { AbstractSyntaxType } from '../../../syntax/grammars';
import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { AllUnaryExpression } from '../../expressions';
import { checkPrecedence } from '../../precedence';
import { VisitorBase } from '../../visitor-registry';

function createUnaryVisitor<TAbstract extends AbstractSyntaxType, TExpression extends AllUnaryExpression> (type: TAbstract & TExpression['type']) {
  return (class extends VisitorBase<TAbstract, TExpression> {
    type = type;

    visit(ast: AbstractSyntaxNode<TAbstract>): TExpression {
      const [child] = ast.children;
      const top = {
        type,
        expression: this.registry.visit(child),
      } as TExpression;

      return checkPrecedence(top) as TExpression;
    }
  }) as (new () => VisitorBase<TAbstract, TExpression>);
}

export const LogicalNegationVisitor = createUnaryVisitor('logicalNegation');
export const NumericalNegationVisitor = createUnaryVisitor('numericalNegation');
export const NumericalCoercionVisitor = createUnaryVisitor('numericalCoercion');
