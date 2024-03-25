import { AbstractSyntaxType } from '../syntax/grammars';
import { AbstractSyntaxNode } from '../syntax/utils/grammar';
import { VisitorRegistry } from './visitor-registry';
import { ExpressionVisitor } from './visitors/expression-visitor';
import { LambdaVisitor } from './visitors/lambda-visitor';
import { LeftFragmentVisitor } from './visitors/left-fragment-visitor';
import { AdditionVisitor, ConjunctionVisitor, ContainsVisitor, DisjunctionVisitor, DivisionVisitor, EqualsVisitor, GreaterThanOrEqualVisitor, GreaterThanVisitor, InVisitor, LessThanOrEqualVisitor, LessThanVisitor, MultiplicationVisitor, NotEqualsVisitor, SubtractionVisitor } from './visitors/operators/binary-visitor';
import { GroupVisitor } from './visitors/operators/group-visitor';
import { ListVisitor } from './visitors/operators/list-visitor';
import { LogicalCoercionVisitor } from './visitors/operators/unary-postfix-visitor';
import { LogicalNegationVisitor, MissingVisitor, NumericalCoercionVisitor, NumericalNegationVisitor } from './visitors/operators/unary-visitor';
import { RightFragmentVisitor } from './visitors/right-fragment-visitor';
import { BooleanVisitor } from './visitors/value/boolean-visitor';
import { IdentifierVisitor } from './visitors/value/identifier-visitor';
import { NullVisitor } from './visitors/value/null-visitor';
import { NumberVisitor } from './visitors/value/number-visitor';
import { StringVisitor } from './visitors/value/string-visitor';
import { ValueVisitor } from './visitors/value/value-visitor';

const registry = new VisitorRegistry()
  // General
  .register(ExpressionVisitor) 
  .register(LambdaVisitor)
  .register(LeftFragmentVisitor)
  .register(RightFragmentVisitor)
  // Value
  .register(BooleanVisitor)
  .register(IdentifierVisitor)
  .register(NullVisitor)
  .register(NumberVisitor)
  .register(StringVisitor)
  .register(ValueVisitor)
  // Left Fragment Operators
  .register(GroupVisitor)
  .register(ListVisitor)
  .register(LogicalNegationVisitor)
  .register(LogicalCoercionVisitor)
  .register(NumericalNegationVisitor)
  .register(NumericalCoercionVisitor)
  .register(MissingVisitor)
  // Right Fragment Operators
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

export function transform<T extends AbstractSyntaxType> (ast: AbstractSyntaxNode<T>) {
  return registry.visit(ast);
}
