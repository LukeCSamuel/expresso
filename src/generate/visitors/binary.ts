import { RulesLogic } from 'json-logic-js';
import { VisitorBase, VisitorRegistry } from '../visitor-registry';
import { AllBinaryExpression, Expression } from '../../parse/transform/expressions';

type BinaryRule =
  | '+'
  | '-'
  | '*'
  | '/'
  | '=='
  | '==='
  | '!='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'and'
  | 'or'
  | 'in'

interface BinaryOptions {
  inverse?: boolean
}

function createBinaryVisitor<T extends AllBinaryExpression, TRule extends BinaryRule> (type: T['type'], rule: TRule, { inverse }: BinaryOptions = {}): new (registry: VisitorRegistry) => VisitorBase<T> {
  return class extends VisitorBase<T> {
    type = type;
    visit (expression: T): RulesLogic {
      const left = this.registry.visit(expression.left as Expression);
      const right = this.registry.visit(expression.right as Expression);

      return {
        [rule]: inverse ? [right, left] : [left, right],
      } as RulesLogic;
    }
  };
}

export const AdditionVisitor = createBinaryVisitor('addition', '+');
export const SubtractionVisitor = createBinaryVisitor('subtraction', '-');
export const MultiplicationVisitor = createBinaryVisitor('multiplication', '*');
export const DivisionVisitor = createBinaryVisitor('division', '/');
export const ConjunctionVisitor = createBinaryVisitor('conjunction', 'and');
export const DisjunctionVisitor = createBinaryVisitor('disjunction', 'or');
export const EqualsVisitor = createBinaryVisitor('equals', '===');
export const NotEqualsVisitor = createBinaryVisitor('notEquals', '!==');
export const LessThanVisitor = createBinaryVisitor('lessThan', '<');
export const LessThanOrEqualVisitor = createBinaryVisitor('lessThanOrEqual', '<=');
export const GreaterThanVisitor = createBinaryVisitor('greaterThan', '>');
export const GreaterThanOrEqualVisitor = createBinaryVisitor('greaterThanOrEqual', '>=');
export const InVisitor = createBinaryVisitor('in', 'in');
export const ContainsVisitor = createBinaryVisitor('contains', 'in', { inverse: true });
