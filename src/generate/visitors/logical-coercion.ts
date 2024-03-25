import { JsonLogicDoubleNegation } from 'json-logic-js';
import { UnaryExpression } from '../../parse/transform/expressions/unary';
import { VisitorBase } from '../visitor-registry';
import { Expression } from '../../parse/transform/expressions';

export class LogicalCoercionVisitor extends
VisitorBase<UnaryExpression<'logicalCoercion'>> {
  type = 'logicalCoercion' as const;
  visit(expression: UnaryExpression<'logicalCoercion'>): JsonLogicDoubleNegation {
    return {
      '!!': [this.registry.visit(expression.expression as Expression)],
    };
  }
}
