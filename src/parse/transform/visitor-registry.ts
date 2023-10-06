import { AbstractSyntaxType } from '../syntax/grammars';
import { AbstractSyntaxNode } from '../syntax/utils/grammar';
import { Expression } from './expressions';

type VisitorMap<TRegisteredTypes extends AbstractSyntaxType, TResultMap extends Record<AbstractSyntaxType, Expression>> = {
  [K in TRegisteredTypes]: VisitorBase<K, TResultMap[K]>
}

export type FilledVisitorRegistry = VisitorRegistry<AbstractSyntaxType, Record<AbstractSyntaxType, Expression>>

export class VisitorRegistry<TRegisteredTypes extends AbstractSyntaxType = never, TResultMap extends Record<AbstractSyntaxType, Expression> = Record<string, never>> {
  visitors: VisitorMap<TRegisteredTypes, TResultMap> = {} as unknown as VisitorMap<TRegisteredTypes, TResultMap>;

  register<T extends AbstractSyntaxType, TResult extends Expression> (Visitor: new (registry: FilledVisitorRegistry) => VisitorBase<T, TResult>) {
    const visitor = new Visitor(this as unknown as FilledVisitorRegistry);
    // @ts-expect-error this doesn't know the type it's about to become
    this.visitors[visitor.type] = visitor;
    return this as unknown as VisitorRegistry<TRegisteredTypes | T, TResultMap & { [K in T]: TResult }>;
  }

  visit (ast: AbstractSyntaxNode, context?: Expression): Expression
  visit<T extends TRegisteredTypes> (ast: AbstractSyntaxNode<T>, context?: Expression): TResultMap[T] {
    const visitor = this.visitors[ast.type];
    if (!visitor) {
      throw new Error(`No visitor is defined to handle syntax nodes of type "${ast.type}".`);
    }
    return visitor.visit(ast, context);
  }
}

export abstract class VisitorBase<T extends AbstractSyntaxType, TResult extends Expression> {
  abstract type: T;

  constructor (protected registry: FilledVisitorRegistry) {}

  abstract visit (ast: AbstractSyntaxNode<T>, context?: Expression): TResult
}
