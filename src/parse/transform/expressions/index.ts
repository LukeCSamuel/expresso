import { AdditionExpression } from './addition';
import { GroupExpression } from './group';
import { IdentifierExpression } from './identifier';
import { LiteralExpression } from './literal';
import { LogicalNegationExpression } from './logical-negation';
import { MultiplicationExpression } from './multiplication';

export type Expression =
  | AdditionExpression
  | GroupExpression
  | IdentifierExpression
  | LiteralExpression
  | LogicalNegationExpression
  | MultiplicationExpression
