import { Token } from '../../lexer/tokens';

export interface AbstractSyntaxNode<T extends string = string> {
  type: T
  children: AbstractSyntaxNode[]
  matched: Token[]
}

export interface Grammar<T extends string = string> {
  match (tokens: Token[]): AbstractSyntaxNode<T> | false
}

export function and<T extends string = string> (type: T, grammars: Grammar[]): Grammar<T> {
  const captured = [...grammars];

  if (captured.length === 0) {
    throw new Error('Cannot compose an empty set of grammars.');
  }

  return {
    match (tokens) {
      const children = [] as AbstractSyntaxNode[];
      const matched = [] as Token[];
      for (const grammar of captured) {
        const result = grammar.match(tokens.slice(matched.length));
        if (result) {
          if (result.type === type) {
            children.push(...result.children);
          } else {
            children.push(result);
          }
          matched.push(...result.matched);
        } else {
          return false;
        }
      }

      return {
        type,
        children,
        matched,
      };
    },
  };
}

export function or<T extends string = string> (type: T, grammars: Grammar[]): Grammar<T> {
  const captured = [...grammars];
  return {
    match (tokens) {
      for (const grammar of captured) {
        const result = grammar.match(tokens);
        if (result) {
          if (result.type === type) {
            return result as AbstractSyntaxNode<T>;
          } else {
            return {
              type,
              children: [result],
              matched: result.matched,
            };
          }
        }
      }

      return false;
    },
  };
}

export function compose<T extends string = string> (type: T) {
  return function (strings: TemplateStringsArray, ...grammars: Grammar[]): Grammar<T> {
    const ops = strings.slice(1, -1);
    const grammarChains = [] as Grammar<T>[];
    const currentChain = [] as Grammar[];
    for (let i = 0; i < grammars.length; i++) {
      currentChain.push(grammars[i]);
      if (i === grammars.length - 1 || ops[i].trim() === '|') {
        // combine the current chain using the `and` operation
        grammarChains.push(and<T>(type, currentChain));
        // clear the current chain
        currentChain.length = 0;
      }
    }

    return or<T>(type, grammarChains);
  };
}
