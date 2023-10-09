import { JsonLogicVar } from 'json-logic-js';
import { IdentifierExpression } from '../../parse/transform/expressions/identifier';
import { VisitorBase } from '../visitor-registry';

export class IdentifierVisitor extends VisitorBase<IdentifierExpression> {
  type = 'identifier' as const;
  visit (expression: IdentifierExpression): JsonLogicVar {
    return {
      var: expression.name,
    };
  }
}
