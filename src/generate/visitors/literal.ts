import { RulesLogic } from 'json-logic-js';
import { LiteralExpression } from '../../parse/transform/expressions/literal';
import { VisitorBase } from '../visitor-registry';

export class LiteralVisitor extends VisitorBase<LiteralExpression> {
  type = 'literal' as const;
  visit (expression: LiteralExpression<string | number | boolean | null>): RulesLogic {
    // the library @types/json-logic-js doesn't recognize `null` as valid, even though it is
    return expression.value as RulesLogic;
  }
}
