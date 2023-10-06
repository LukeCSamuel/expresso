export interface BinaryExpression<T extends string> {
  type: T
  left: object
  right: object
}
