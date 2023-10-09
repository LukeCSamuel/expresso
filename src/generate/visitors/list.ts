import { RulesLogic } from 'json-logic-js';
import { VisitorBase } from '../visitor-registry';
import { ListExpression } from '../../parse/transform/expressions/list';
import { Expression } from '../../parse/transform/expressions';

export class ListVisitor extends VisitorBase<ListExpression> {
  type = 'list' as const;
  visit (expression: ListExpression): RulesLogic {
    // types for RulesLogic are a little too strict for our dynamic construction
    return expression.entries.map(entry => this.registry.visit(entry as Expression)) as unknown as RulesLogic;
  }
}
