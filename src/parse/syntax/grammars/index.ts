import { Grammar } from '../utils/grammar';
import { Expression } from './Expression';
import { Lambda } from './lambda';
import { LeftFragment } from './left-fragment';
import { Addition } from './operators/addition';
import { Group } from './operators/group';
import { LogicalNegation } from './operators/logical-negation';
import { Multiplication } from './operators/multiplication';
import { RightFragment } from './right-fragment';
import { GrammarBoolean } from './value/boolean';
import { Identifier } from './value/identifier';
import { Null } from './value/null';
import { GrammarNumber } from './value/number';
import { GrammarString } from './value/string';
import { Value } from './value/value';

type AbstractSyntaxNodeType<T extends Grammar> = Exclude<ReturnType<T['match']>, false>['type']

export type AbstractSyntaxType =
  // General
  | AbstractSyntaxNodeType<Expression>
  | AbstractSyntaxNodeType<Lambda>
  | AbstractSyntaxNodeType<LeftFragment>
  | AbstractSyntaxNodeType<RightFragment>
  // Values
  | AbstractSyntaxNodeType<GrammarBoolean>
  | AbstractSyntaxNodeType<GrammarNumber>
  | AbstractSyntaxNodeType<GrammarString>
  | AbstractSyntaxNodeType<Identifier>
  | AbstractSyntaxNodeType<Null>
  | AbstractSyntaxNodeType<Value>
  // Operators
  | AbstractSyntaxNodeType<Addition>
  | AbstractSyntaxNodeType<Group>
  | AbstractSyntaxNodeType<LogicalNegation>
  | AbstractSyntaxNodeType<Multiplication>

