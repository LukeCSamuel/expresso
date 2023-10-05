import { Grammar } from './grammar';

export interface ParsingContextOptions {
  filename?: string
  input: string
}

export class ParsingContext {
  filename?: string;
  input: string;
  grammars = new WeakMap();

  constructor ({ filename, input }: ParsingContextOptions) {
    this.filename = filename;
    this.input = input;
  }


  get (Grammar: new (context: ParsingContext) => Grammar): Grammar {
    if (this.grammars.has(Grammar)) {
      return this.grammars.get(Grammar);
    } else {
      // Create and register an object as the instance, then populate it with the properties
      //   of the actual grammar instance.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const instance = {} as any;
      this.grammars.set(Grammar, instance);
      const grammar = new Grammar(this);
      Object.assign(instance, grammar);
      instance.match = grammar.match.bind(instance);
      return instance;
    }
  }
}
