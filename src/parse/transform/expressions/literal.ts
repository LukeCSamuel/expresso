export interface LiteralExpression<T extends null | boolean | number | string = null | boolean | number | string> {
  type: 'literal'
  value: T
}
