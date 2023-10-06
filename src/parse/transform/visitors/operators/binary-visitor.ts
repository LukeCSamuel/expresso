import { ParseError } from '../../../parse-error';
import { AbstractSyntaxType } from '../../../syntax/grammars';
import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { AllBinaryExpression, Expression } from '../../expressions';
import { Swappable, checkPrecedence } from '../../precedence';
import { VisitorBase } from '../../visitor-registry';

function createBinaryVisitor<TAbstract extends AbstractSyntaxType, TExpression extends AllBinaryExpression> (type: TAbstract & TExpression['type']) {
  return (class extends VisitorBase<TAbstract, TExpression> {
    type = type;
    
    visit (ast: AbstractSyntaxNode<TAbstract>, context?: Expression | undefined): TExpression {
      // if context is undefined, then throw a parse error
      if (!context) {
        throw new ParseError(`The "${type}" operator must be visited with context.`, {
          token: ast.matched[0],
        });
      }

      const [right] = ast.children;
      const rightTransform = this.registry.visit(right);

      const result: Swappable = {
        type,
        left: context,
        right: rightTransform,
      };

      return checkPrecedence(result) as TExpression;
    }
  }) as (new () => VisitorBase<TAbstract, TExpression>);
}

export const AdditionVisitor = createBinaryVisitor('addition');
export const SubtractionVisitor = createBinaryVisitor('subtraction');
export const MultiplicationVisitor = createBinaryVisitor('multiplication');
export const DivisionVisitor = createBinaryVisitor('division');
export const ConjunctionVisitor = createBinaryVisitor('conjunction');
export const DisjunctionVisitor = createBinaryVisitor('disjunction');
export const EqualsVisitor = createBinaryVisitor('equals');
export const LessThanVisitor = createBinaryVisitor('lessThan');
export const LessThanOrEqualVisitor = createBinaryVisitor('lessThanOrEqual');
export const GreaterThanVisitor = createBinaryVisitor('greaterThan');
export const GreaterThanOrEqualVisitor = createBinaryVisitor('greaterThanOrEqual');
export const InVisitor = createBinaryVisitor('in');
export const ContainsVisitor = createBinaryVisitor('contains');
