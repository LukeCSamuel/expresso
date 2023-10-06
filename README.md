# Expresso

A transpiler to convert human-readable expressions into JsonLogic.

## Steps

The compiler is implemented in 4 distinct steps:

### Tokenization

The `tokenize` function turns an input string into a token list according to the tokens defined in `src/lexer/tokens`.

### Parsing

Grammars defined in `src/syntax/grammars` are matched to the tokens from the previous step to construct an abstract syntax tree.

### Transformation

The `transform` function accepts an abstract syntax tree and creates a semantic expression tree using visitors defined in `src/transform/transform`.

### Generation

TODO

## Grammars

Nearly all grammars belong to one of two categories: Left Fragments and Right Fragments.  Grammars must not be left-recursive, and splitting them into these fragments facilitates that.  A Left Fragment then can be any grammar that starts with a specific token, such as an identifier, group clause, or a unary prefix.  A Right Fragment is a grammar that is applied to the expression on its left, such as a binary operator, function application, or member access.  The combination of a Left Fragment and zero or more Right Fragments constitutes an Expression.

To maintain consistency and reduce complexity, fragments should adhere to the following rules:
 - A Left Fragment may match an Expression as any of its children
 - A Right Fragment may only match a Left Fragment as a direct child
 - Chaining of Right Fragments (e.g. `a + b + c`) is handled by the Expression grammar
