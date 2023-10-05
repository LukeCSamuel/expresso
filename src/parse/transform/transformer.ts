import { AbstractSyntaxType } from '../syntax/grammars';
import { AbstractSyntaxNode } from '../syntax/utils/grammar';
import { VisitorRegistry } from './visitor-registry';
import { ExpressionVisitor } from './visitors/expression-visitor';
import { LambdaVisitor } from './visitors/lambda-visitor';
import { LeftFragmentVisitor } from './visitors/left-fragment-visitor';
import { AdditionVisitor } from './visitors/operators/addition-visitor';
import { GroupVisitor } from './visitors/operators/group-visitor';
import { LogicalNegationVisitor } from './visitors/operators/logical-negation-visitor';
import { MultiplicationVisitor } from './visitors/operators/multiplication-visitor';
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
  // Operators
  .register(AdditionVisitor)
  .register(GroupVisitor)
  .register(LogicalNegationVisitor)
  .register(MultiplicationVisitor)
  ;

export function transform<T extends AbstractSyntaxType> (ast: AbstractSyntaxNode<T>) {
  return registry.visit(ast);
}
