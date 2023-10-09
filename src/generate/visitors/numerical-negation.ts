import { JsonLogicDifference } from 'json-logic-js';
import { UnaryExpression } from '../../parse/transform/expressions/unary';
import { VisitorBase } from '../visitor-registry';
import { Expression } from '../../parse/transform/expressions';

export class NumericalNegationVisitor extends VisitorBase<UnaryExpression<'numericalNegation'>> {
  type = 'numericalNegation' as const;
  visit(expression: UnaryExpression<'numericalNegation'>): JsonLogicDifference {
    return {
      '-': [0, this.registry.visit(expression.expression as Expression)],
    };
  }
}
