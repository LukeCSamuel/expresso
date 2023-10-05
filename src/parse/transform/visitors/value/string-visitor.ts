import { AbstractSyntaxNode } from '../../../syntax/utils/grammar';
import { LiteralExpression } from '../../expressions/literal';
import { VisitorBase } from '../../visitor-registry';

export class StringVisitor extends VisitorBase<'string', LiteralExpression<string>> {
  type = 'string' as const;
  visit (ast: AbstractSyntaxNode<'string'>): LiteralExpression<string> {
    const [token] = ast.matched;
    return {
      type: 'literal',
      value: token.value.slice(1, -1),
    };
  }
}
