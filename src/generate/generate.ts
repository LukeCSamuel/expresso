import { Expression } from '../parse/transform/expressions';
import { VisitorRegistry } from './visitor-registry';
import { AdditionVisitor, ConjunctionVisitor, ContainsVisitor, DisjunctionVisitor, DivisionVisitor, EqualsVisitor, GreaterThanOrEqualVisitor, GreaterThanVisitor, InVisitor, LessThanOrEqualVisitor, LessThanVisitor, MultiplicationVisitor, NotEqualsVisitor, SubtractionVisitor } from './visitors/binary';
import { GroupVisitor } from './visitors/group';
import { IdentifierVisitor } from './visitors/identifier';
import { ListVisitor } from './visitors/list';
import { LiteralVisitor } from './visitors/literal';
import { LogicalCoercionVisitor } from './visitors/logical-coercion';
import { LogicalNegationVisitor } from './visitors/logical-negation';
import { MissingVisitor } from './visitors/missing';
import { NumericalCoercionVisitor } from './visitors/numerical-coercion';
import { NumericalNegationVisitor } from './visitors/numerical-negation';

const registry = new VisitorRegistry()
  .register(LiteralVisitor)
  .register(IdentifierVisitor)
  .register(ListVisitor)
  .register(GroupVisitor)
  // Unary Operators
  .register(LogicalNegationVisitor)
  .register(LogicalCoercionVisitor)
  .register(NumericalNegationVisitor)
  .register(NumericalCoercionVisitor)
  .register(MissingVisitor)
  // Binary Operators
  .register(AdditionVisitor)
  .register(SubtractionVisitor)
  .register(MultiplicationVisitor)
  .register(DivisionVisitor)
  .register(ConjunctionVisitor)
  .register(DisjunctionVisitor)
  .register(EqualsVisitor)
  .register(NotEqualsVisitor)
  .register(LessThanVisitor)
  .register(LessThanOrEqualVisitor)
  .register(GreaterThanVisitor)
  .register(GreaterThanOrEqualVisitor)
  .register(InVisitor)
  .register(ContainsVisitor)
  ;

export function generate (expressionTree: Expression) {
  return registry.visit(expressionTree);
}
