export type CommentTokenType = 'comment'

export type CommentToken = {
  type: CommentTokenType
  value: string
}

export function tryCommentToken (input: string): CommentToken | false {
  const matches = input.match(/^#[^\n]*(?:\n|$)/);
  if (matches) {
    return {
      type: 'comment',
      value: matches[0],
    };
  } else {
    return false;
  }
}
