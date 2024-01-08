import { BinaryExpression } from './binary';
import { GroupExpression } from './group';
import { IdentifierExpression } from './identifier';
import { ListExpression } from './list';
import { LiteralExpression } from './literal';
import { UnaryExpression } from './unary';

export const binaryExpressionTypes = [
  'addition',
  'subtraction',
  'multiplication',
  'division',
  'conjunction',
  'disjunction',
  'equals',
  'lessThan',
  'lessThanOrEqual',
  'greaterThan',
  'greaterThanOrEqual',
  'in',
  'contains',
] as const;

type AllBinaryExpressionHelper<T> = T extends (typeof binaryExpressionTypes)[number] ? BinaryExpression<T> : never;
export type AllBinaryExpression = AllBinaryExpressionHelper<(typeof binaryExpressionTypes)[number]>

export const unaryExpressionTypes = [
  'logicalNegation',
  'numericalNegation',
  'numericalCoercion',
  'missing',
] as const;

type AllUnaryExpressionHelper<T> = T extends (typeof unaryExpressionTypes)[number] ? UnaryExpression<T> : never;
export type AllUnaryExpression = AllUnaryExpressionHelper<(typeof unaryExpressionTypes)[number]>

export type Expression =
  | AllBinaryExpression
  | AllUnaryExpression
  | GroupExpression
  | IdentifierExpression
  | ListExpression
  | LiteralExpression
