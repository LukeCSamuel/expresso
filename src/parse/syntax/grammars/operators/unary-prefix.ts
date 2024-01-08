import { define } from '../../utils/define';
import { Expression } from '../Expression';
import { Identifier } from '../value/identifier';

export const LogicalNegation = define('logicalNegation')
  .as(['keyword', 'not'], () => Expression);
export const NumericalNegation = define('numericalNegation')
  .as(['operator', '-'], () => Expression);
export const NumericalCoercion = define('numericalCoercion')
  .as(['operator', '+'], () => Expression);
export const Missing = define('missing')
  .as(['keyword', 'missing'], 'whitespace+', () => Identifier);
