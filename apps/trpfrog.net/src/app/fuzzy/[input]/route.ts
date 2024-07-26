import { openai } from '@ai-sdk/openai'
import { readAllSlugs } from '@trpfrog.net/posts/fs'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

import { createRateLimit } from '@/lib/rateLimit'

const limiter = createRateLimit({
  interval: 60 * 1000 * 60, // 1 hour
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

const pagePaths = [
  'balloon',
  'blog',
  'certification',
  'download',
  'environment',
  'icon-maker',
  'icons',
  'legal',
  'links',
  'music',
  'stickers',
  'toppage',
  'walking',
  'works',
]

let blogPaths = [] as string[]

type GETProps = {
  params: {
    input: string
  }
}

export async function GET(req: NextRequest, props: GETProps) {
  const res = NextResponse.next()

  const input = props.params.input.slice(0, 100)

  if (blogPaths.length === 0) {
    blogPaths = await readAllSlugs()
  }

  const prompt =
    'The following gives the "search target list" and "input". ' +
    'You are to find the string X in the "search target list" ' +
    'that you consider to be the most CLOSE to the "input", ' +
    'taking into account both "edit distance" and "semantic proximity". ' +
    'At this time, more consideration should be given to the edit distance. ' +
    'Then output X to a line.\n' +
    '\n' +
    '### search target list ###\n' +
    '\n' +
    pagePaths.map(s => '- /' + s + '\n').join('') +
    blogPaths.map(s => '- /blog/' + s + '\n').join('')

  try {
    await limiter.check(res, 5, req.ip ?? 'ip_not_found')
    const { text: output } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: 'weblog',
        },
        {
          role: 'assistant',
          content: '/blog',
        },
        {
          role: 'user',
          content: input,
        },
      ],
    })

    console.log({
      prompt,
      output,
    })

    return NextResponse.redirect(new URL(output, req.url))
  } catch {
    return NextResponse.redirect(new URL('/', req.url))
  }
}
