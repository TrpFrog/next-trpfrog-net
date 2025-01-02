import { describe, expect, it } from 'vitest'

import { parseConversation } from './parse'

describe('Conversation parse', () => {
  const cases: {
    name: string
    input: string
    output: { speaker: string; comment: string; outOfComment?: string }[]
  }[] = [
    {
      name: 'single',
      input: ['speaker: comment'].join('\n'),
      output: [{ speaker: 'speaker', comment: 'comment' }],
    },
    {
      name: 'single with outOfComment',
      input: ['speaker: comment  ← outOfComment'].join('\n'),
      output: [{ speaker: 'speaker', comment: 'comment', outOfComment: 'outOfComment' }],
    },
    {
      name: 'outOfComment spacing should be 2 or more',
      input: ['speaker: comment ← outOfComment'].join('\n'),
      output: [{ speaker: 'speaker', comment: 'comment ← outOfComment' }],
    },
    {
      name: 'comment can be empty',
      input: ['speaker:'].join('\n'),
      output: [{ speaker: 'speaker', comment: '' }],
    },
    {
      name: 'comment can be broken line',
      input: ['speaker:', 'comment1', 'comment2', 'comment3'].join('\n'),
      output: [{ speaker: 'speaker', comment: 'comment1\ncomment2\ncomment3' }],
    },
    {
      name: 'should trim input',
      input: ['', '  speaker:  comment  ←  outOfComment  ', '', ''].join('\n'),
      output: [{ speaker: 'speaker', comment: 'comment', outOfComment: 'outOfComment' }],
    },
    {
      name: 'multiple complex pattern',
      input: [
        'speaker1: comment1',
        'speaker2:',
        'comment2',
        'speaker3: comment3  ← outOfComment3',
        'speaker4: comment4  ← outOfComment4',
        'speaker5:',
        'comment5',
        'comment5',
        'comment5',
        'speaker6: comment6',
      ].join('\n'),
      output: [
        { speaker: 'speaker1', comment: 'comment1' },
        { speaker: 'speaker2', comment: 'comment2' },
        {
          speaker: 'speaker3',
          comment: 'comment3',
          outOfComment: 'outOfComment3',
        },
        {
          speaker: 'speaker4',
          comment: 'comment4',
          outOfComment: 'outOfComment4',
        },
        { speaker: 'speaker5', comment: 'comment5\ncomment5\ncomment5' },
        { speaker: 'speaker6', comment: 'comment6' },
      ],
    },
  ]

  cases.forEach(({ name, input, output }) => {
    it(name, () => {
      expect(parseConversation(input)).toEqual(output)
    })
  })
})
