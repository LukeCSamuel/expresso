import { RulesLogic } from 'json-logic-js';
import { GroupExpression } from '../../parse/transform/expressions/group';
import { VisitorBase } from '../visitor-registry';
import { Expression } from '../../parse/transform/expressions';

export class GroupVisitor extends VisitorBase<GroupExpression> {
  type = 'group' as const;
  visit(expression: GroupExpression): RulesLogic {
    return this.registry.visit(expression.expression as Expression);
  }
}
