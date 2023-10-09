import { RulesLogic } from 'json-logic-js';
import { Expression } from '../parse/transform/expressions';

type VisitorMap = {
  [K in Expression['type']]?: VisitorBase<Expression>
}

export class VisitorRegistry {
  visitors = {} as VisitorMap;

  register<T extends Expression> (Visitor: new (registry: this) => VisitorBase<T>): this {
    const visitor = new Visitor(this);
    this.visitors[visitor.type] = visitor;
    return this;
  }

  visit<T extends Expression> (expression: T): RulesLogic {
    const visitor = this.visitors[expression.type];
    if (visitor) {
      return visitor.visit(expression);
    } else {
      throw new Error(`No generator is defined for expression type "${expression.type}".`);
    }
  }
}

export abstract class VisitorBase<T extends Expression> {
  abstract type: T['type'];

  constructor (protected registry: VisitorRegistry) {}
  
  abstract visit (expression: T): RulesLogic
}
