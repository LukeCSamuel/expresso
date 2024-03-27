/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { Grammar } from '../utils/grammar';
import { Expression } from './Expression';
import { Lambda } from './lambda';
import { LeftFragment } from './left-fragment';
import { Addition, Conjunction, Contains, Disjunction, Division, Equals, GreaterThan, GreaterThanOrEqual, In, LessThan, LessThanOrEqual, Multiplication, NotEquals, Subtraction } from './operators/binary';
import { Group } from './operators/group';
import { List } from './operators/list';
import { LogicalCoercion } from './operators/unary-postfix';
import { LogicalNegation, NumericalCoercion, NumericalNegation, Missing } from './operators/unary-prefix';
import { PostfixFragment } from './postfix-fragment';
import { RightFragment } from './right-fragment';
import { GrammarBoolean } from './value/boolean';
import { Identifier } from './value/identifier';
import { Null } from './value/null';
import { GrammarNumber } from './value/number';
import { GrammarString } from './value/string';
import { Value } from './value/value';

type ConstructorReturnType<T extends any> =
  T extends new (...args: any[]) => infer R
  ? R
  : never

type AbstractSyntaxNodeType<T extends any> =
  T extends Grammar
  ? Exclude<ReturnType<T['match']>, false>['type']
  : T extends new (...args: any[]) => Grammar
  ? Exclude<ReturnType<ConstructorReturnType<T>['match']>, false>['type']
  : never

export type AbstractSyntaxType =
  // General
  | AbstractSyntaxNodeType<Expression>
  | AbstractSyntaxNodeType<Lambda>
  | AbstractSyntaxNodeType<LeftFragment>
  | AbstractSyntaxNodeType<PostfixFragment>
  | AbstractSyntaxNodeType<RightFragment>
  // Values
  | AbstractSyntaxNodeType<GrammarBoolean>
  | AbstractSyntaxNodeType<GrammarNumber>
  | AbstractSyntaxNodeType<GrammarString>
  | AbstractSyntaxNodeType<Identifier>
  | AbstractSyntaxNodeType<Null>
  | AbstractSyntaxNodeType<Value>
  // Left Fragment Operators
  | AbstractSyntaxNodeType<Group>
  | AbstractSyntaxNodeType<List>
  | AbstractSyntaxNodeType<typeof LogicalNegation>
  | AbstractSyntaxNodeType<typeof NumericalNegation>
  | AbstractSyntaxNodeType<typeof NumericalCoercion>
  | AbstractSyntaxNodeType<typeof Missing>
  // Right Fragment Operators
  | AbstractSyntaxNodeType<typeof Addition>
  | AbstractSyntaxNodeType<typeof Subtraction>
  | AbstractSyntaxNodeType<typeof Multiplication>
  | AbstractSyntaxNodeType<typeof Division>
  | AbstractSyntaxNodeType<typeof Conjunction>
  | AbstractSyntaxNodeType<typeof Disjunction>
  | AbstractSyntaxNodeType<typeof Equals>
  | AbstractSyntaxNodeType<typeof NotEquals>
  | AbstractSyntaxNodeType<typeof LessThan>
  | AbstractSyntaxNodeType<typeof LessThanOrEqual>
  | AbstractSyntaxNodeType<typeof GreaterThan>
  | AbstractSyntaxNodeType<typeof GreaterThanOrEqual>
  | AbstractSyntaxNodeType<typeof In>
  | AbstractSyntaxNodeType<typeof Contains>
  | AbstractSyntaxNodeType<typeof LogicalCoercion>

