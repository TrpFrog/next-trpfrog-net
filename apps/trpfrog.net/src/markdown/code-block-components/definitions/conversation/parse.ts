import { parseColonSeparatedList } from '@trpfrog.net/posts/parser'

export type ConversationRecord = {
  speaker: string
  comment: string
  outOfComment?: string
}

/**
 * Parse a conversation notation into ConversationRecord
 *
 * @example
 * speaker: comment  ← outOfComment
 * speaker:
 * comment  ← outOfComment
 * speaker: comment  ← outOfComment
 *
 * => { speaker: string, comment: string, outOfComment: string }[]
 *
 * @param rawText colon separated conversation notation
 */
export function parseConversation(rawText: string): ConversationRecord[] {
  const rawRecords = parseColonSeparatedList(rawText)

  return rawRecords.map(({ key: speaker, value: comment }) => {
    let outOfComment = ''
    const leftArrowIdentifier = '  ←' // 2 spaces before left arrow
    if (comment.includes(leftArrowIdentifier)) {
      ;[comment, outOfComment] = comment.split(leftArrowIdentifier)
    }

    return {
      speaker,
      comment: comment.trim(),
      outOfComment: outOfComment?.trim() || undefined,
    } satisfies ConversationRecord
  })
}
