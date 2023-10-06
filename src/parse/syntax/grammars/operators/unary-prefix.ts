import { define } from '../../utils/define';
import { Expression } from '../Expression';

export const LogicalNegation = define('logicalNegation')
  .as(['keyword', 'not'], () => Expression);
export const NumericalNegation = define('numericalNegation')
  .as(['operator', '-'], () => Expression);
export const NumericalCoercion = define('numericalCoercion')
  .as(['operator', '+'], () => Expression);
