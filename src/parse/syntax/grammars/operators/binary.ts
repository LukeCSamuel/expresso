import { define } from '../../utils/define';
import { LeftFragment } from '../left-fragment';

export const Addition = define('addition')
  .as(['operator', '+'], () => LeftFragment);

export const Subtraction = define('subtraction')
  .as(['operator', '-'], () => LeftFragment);

export const Multiplication = define('multiplication')
  .as(['operator', '*'], () => LeftFragment);

export const Division = define('division')
  .as(['operator', '/'], () => LeftFragment);

export const Conjunction = define('conjunction')
  .as(['keyword', 'and'], () => LeftFragment);

export const Disjunction = define('disjunction')
  .as(['keyword', 'or'], () => LeftFragment);

export const Equals = define('equals')
  .as(['operator', '='], () => LeftFragment);

export const LessThan = define('lessThan')
  .as(['operator', '<'], () => LeftFragment);

export const LessThanOrEqual = define('lessThanOrEqual')
  .as(['operator', '<'], ['operator', '='], () => LeftFragment);

export const GreaterThan = define('greaterThan')
  .as(['operator', '>'], () => LeftFragment);

export const GreaterThanOrEqual = define('greaterThanOrEqual')
  .as(['operator', '>'], ['operator', '='], () => LeftFragment);


export const In = define('in')
  .as(['keyword', 'in'], () => LeftFragment);

export const Contains = define('contains')
  .as(['keyword', 'contains'], () => LeftFragment);
