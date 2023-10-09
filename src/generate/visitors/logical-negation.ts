import { JsonLogicNegation } from 'json-logic-js';
import { UnaryExpression } from '../../parse/transform/expressions/unary';
import { VisitorBase } from '../visitor-registry';
import { Expression } from '../../parse/transform/expressions';

export class LogicalNegationVisitor extends VisitorBase<UnaryExpression<'logicalNegation'>> {
  type = 'logicalNegation' as const;
  visit(expression: UnaryExpression<'logicalNegation'>): JsonLogicNegation {
    return {
      '!': [this.registry.visit(expression.expression as Expression)],
    };
  }
}
