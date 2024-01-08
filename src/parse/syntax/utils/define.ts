import { RawToken, Token, TokenType } from '../../lexer/tokens';
import { matchCommentsAndWhitespace } from './comments-and-whitespace';
import { AbstractSyntaxNode, Grammar, and, or } from './grammar';
import { ParsingContext } from './parsing-context';

type RawTokenToTuple<T extends RawToken = RawToken> = T extends RawToken ? [T['type'], T['value']] : never

export type GrammarComponent =
  | [type: TokenType]
  | RawTokenToTuple
  | (() => (new (context: ParsingContext) => Grammar))
  | 'whitespace+'

function combine<T extends string> (type: T, context: ParsingContext, grammars: GrammarComponent[][]): Grammar<T> {
  const conjunctions = grammars.map(clauses =>
    and(type, clauses.map(clause => {
      // normalize the clauses, then 'and' them together
      if (typeof clause === 'function') {
        return context.get(clause());
      } else if (clause === 'whitespace+') {
        return {
          type,
          match (tokens: Token[]): false | AbstractSyntaxNode<T> {
            const ignored = matchCommentsAndWhitespace(tokens);
            if (ignored.length === 0) {
              return false;
            } else {
              return {
                type,
                children: [],
                matched: ignored,
              };
            }
          },
        };
      } else {
        const [clauseType, clauseValue] = clause;
        return {
          type,
          match (tokens: Token[]): false | AbstractSyntaxNode<T> {
            const [first] = tokens;
            if (first.type !== clauseType || (clauseValue && first.value !== clauseValue)) {
              return false;
            } else {
              return {
                type,
                children: [],
                matched: [first],
              };
            }
          },
        };
      }
    })),
  );

  return or(type, conjunctions);
}

function as<T extends string> (type: T, initialComponents: GrammarComponent[]) {
  const grammars = [initialComponents] as GrammarComponent[][];
  const builder = {
    or (...components: GrammarComponent[]) {
      grammars.push(components);
      return returnBuilder();
    },
    build (): new (context: ParsingContext) => Grammar<T> {
      return class implements Grammar<T> {
        grammar: Grammar<T>;
        constructor (public context: ParsingContext) {
          this.grammar = combine(type, context, grammars);
        }
        match (tokens: Token[]): false | AbstractSyntaxNode<T> {
          return this.grammar.match(tokens);
        }
      };
    },
  };

  function returnBuilder () {
    return Object.assign(builder.build(), builder);
  }

  return returnBuilder();
}

export function define<T extends string> (type: T) {
  return {
    as (...components: GrammarComponent[]) {
      return as(type, components);
    },
  };
}
