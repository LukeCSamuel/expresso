import { JsonLogicDoubleNegation } from 'json-logic-js';
import { UnaryExpression } from '../../parse/transform/expressions/unary';
import { VisitorBase } from '../visitor-registry';
import { IdentifierExpression } from '../../parse/transform/expressions/identifier';

export class MissingVisitor extends VisitorBase<UnaryExpression<'missing'>> {
  type = 'missing' as const;
  visit (expression: UnaryExpression<'missing'>): JsonLogicDoubleNegation {
    const { name } = expression.expression as IdentifierExpression;
    return {
      '!!': { missing: name },
    };
  }
}
