import { LiteralExpression } from '../../expressions/literal';
import { VisitorBase } from '../../visitor-registry';

export class NullVisitor extends VisitorBase<'null', LiteralExpression<null>> {
  type = 'null' as const;
  visit (): LiteralExpression<null> {
    return {
      type: 'literal',
      // eslint-disable-next-line unicorn/no-null
      value: null,
    };
  }

}
