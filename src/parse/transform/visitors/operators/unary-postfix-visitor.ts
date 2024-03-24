import { ParseError } from '../../../parse-error';
import { AbstractSyntaxType } from '../../../syntax/grammars';
import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { AllUnaryExpression, Expression } from '../../expressions';
import { checkPrecedence } from '../../precedence';
import { VisitorBase } from '../../visitor-registry';

function createUnaryPostfixVisitor<TAbstract extends AbstractSyntaxType, TExpression extends AllUnaryExpression> (type: TAbstract & TExpression['type']) {
  return (class extends VisitorBase<TAbstract, TExpression> {
    type = type;

    visit(ast: AbstractSyntaxNode<TAbstract>, context?: Expression | undefined): TExpression {
      // if context is undefined, then throw a parse error
      if (!context) {
        throw new ParseError(`The "${type}" operator must be visited with context.`, {
          token: ast.matched[0],
        });
      }

      const top = {
        type,
        expression: context,
      } as TExpression;

      return checkPrecedence(top) as TExpression;
    }
  }) as (new () => VisitorBase<TAbstract, TExpression>);
}

export const LogicalCoercionVisitor = createUnaryPostfixVisitor('logicalCoercion');
