import { JsonLogicSum } from 'json-logic-js';
import { UnaryExpression } from '../../parse/transform/expressions/unary';
import { VisitorBase } from '../visitor-registry';
import { Expression } from '../../parse/transform/expressions';

export class NumericalCoercionVisitor extends VisitorBase<UnaryExpression<'numericalCoercion'>> {
  type = 'numericalCoercion' as const;
  visit(expression: UnaryExpression<'numericalCoercion'>): JsonLogicSum {
    return {
      '+': [0, this.registry.visit(expression.expression as Expression)],
    };
  }
}
