import { Expression } from './expressions';

const precedence: Record<Expression['type'], number> = {
  group: 0,
  literal: 0,
  identifier: 0,
  list: 0,
  numericalNegation: 20,
  numericalCoercion: 20,
  missing: 20,
  logicalNegation: 30,
  multiplication: 40,
  division: 40,
  addition: 50,
  subtraction: 50,
  equals: 60,
  lessThan: 60,
  lessThanOrEqual: 60,
  greaterThan: 60,
  greaterThanOrEqual: 60,
  in: 70,
  contains: 70,
  conjunction: 80,
  disjunction: 80,
};

export type Swappable = Expression & {
  left: object
  right: object
}

export type Unary = Expression & {
  expression: object
}

export function isSwappable (exp: object): exp is Swappable {
  return !!(exp as unknown as Swappable).left && !!(exp as unknown as Swappable).right;
}

export function isUnary (exp: object): exp is Unary {
  return !!(exp as unknown as Unary).expression;
}

export function checkPrecedence (top: Swappable | Unary): Swappable | Unary {
  const swapPosition = isSwappable(top) ? 'left' : 'expression';
  const bottom = top[swapPosition];
  if (
    (isSwappable(bottom) || isUnary(bottom))
    && precedence[top.type] < precedence[bottom.type]
  ) {
    // if the operation on the bottom has "higher" precedence
    // determine how the two operations are linked and swap them
    // the top needs to become the bottom's right
    if (isSwappable(bottom)) {
      if (isSwappable(top)) {
        top.left = bottom.right;
        bottom.right = top;
      } else {
        top.expression = bottom.left;
        bottom.left = top;
      }
    }
    // the bottom operation is now the top of the tree, so it needs to be returned
    return bottom;
  } else {
    // the top operation is still the top of the tree, so it can be returned
    return top;
  }
}
