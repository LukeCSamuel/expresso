# Expresso

A transpiler to convert human-readable expressions into JsonLogic.

## Development

The compiler is implemented in 4 distinct steps:

### Tokenization

The `tokenize` function turns an input string into a token list according to the tokens defined in `src/lexer/tokens`.

### Parsing

Grammars defined in `src/syntax/grammars` are matched to the tokens from the previous step to construct an abstract syntax tree.

### Transformation

The `transform` function accepts an abstract syntax tree and creates a semantic expression tree using visitors defined in `src/transform/transform`.

### Generation

TODO