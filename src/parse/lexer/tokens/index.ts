import { BracketToken, BracketTokenType, tryBracketToken } from './bracket';
import { CommentToken, CommentTokenType, tryCommentToken } from './comment';
import { IdentifierToken, IdentifierTokenType, tryIdentifierToken } from './identifier';
import { KeywordToken, KeywordTokenType, tryKeywordToken } from './keywords';
import { NumberToken, NumberTokenType, tryNumberToken } from './number';
import { OperatorToken, OperatorTokenType, tryOperatorToken } from './operator';
import { ParenToken, ParenTokenType, tryParenToken } from './paren';
import { StringToken, StringTokenType, tryStringToken } from './string';
import { UnknownToken, UnknownTokenType, createUnknownToken } from './unknown';
import { WhitespaceToken, WhitespaceTokenType, tryWhitespaceToken } from './whitespace';

export type TokenType =
  | CommentTokenType
  | NumberTokenType
  | StringTokenType
  | BracketTokenType
  | ParenTokenType
  | OperatorTokenType
  | KeywordTokenType
  | IdentifierTokenType
  | WhitespaceTokenType
  | UnknownTokenType

export type TokenMeta = {
  line: number
  col: number
}

export type RawToken =
  | CommentToken
  | NumberToken
  | StringToken
  | BracketToken
  | ParenToken
  | OperatorToken
  | KeywordToken
  | IdentifierToken
  | WhitespaceToken
  | UnknownToken

export type Token =
  & TokenMeta
  & RawToken

export function tryToken (input: string): RawToken {
  return tryCommentToken(input)
    || tryNumberToken(input)
    || tryStringToken(input)
    || tryBracketToken(input)
    || tryParenToken(input)
    || tryOperatorToken(input)
    || tryKeywordToken(input)
    || tryIdentifierToken(input)
    || tryWhitespaceToken(input)
    || createUnknownToken(input);
}
