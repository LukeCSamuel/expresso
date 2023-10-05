import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { LiteralExpression } from '../../expressions/literal';
import { VisitorBase } from '../../visitor-registry';

export class NumberVisitor extends VisitorBase<'number', LiteralExpression<number>> {
  type = 'number' as const;
  visit (ast: AbstractSyntaxNode<'number'>): LiteralExpression<number> {
    const [token] = ast.matched;
    return {
      type: 'literal',
      value: Number(token.value),
    };
  }
}
