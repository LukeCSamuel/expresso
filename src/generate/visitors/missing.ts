import { JsonLogicNone } from 'json-logic-js';
import { UnaryExpression } from '../../parse/transform/expressions/unary';
import { VisitorBase } from '../visitor-registry';
import { Expression } from '../../parse/transform/expressions';

export class MissingVisitor extends VisitorBase<UnaryExpression<'missing'>> {
  type = 'missing' as const;
  visit (expression: UnaryExpression<'missing'>): JsonLogicNone {
    // assert that none of the missing values are the specified identifier
    return {
      none: [
        { missing: [this.registry.visit(expression.expression as Expression)]},
        true,
      ],
    };
  }
}
