/**
 * Create a block for twitter-archived.
 *
 * Usage: First, copy the URL of the tweet you want to create a block for, then run the following command.
 * $ bun tools/createTweetBlock.ts
 */

import { createURL } from '@trpfrog.net/utils'
import clipboardy from 'clipboardy'
import { JSDOM } from 'jsdom'
import { z } from 'zod'

import { formatDateToDisplay } from '@/lib/date'

import { BlogTwitterArchiveSchema } from '@blog/_custom-components/definitions/twitter-archived/generateTwitterArchiveProps'

/**
 * Beautify the tweet HTML.
 * @param tweetHTML
 */
function beautifyTweet(tweetHTML: string): string {
  const dom = new JSDOM(tweetHTML)
  const document = dom.window.document.body

  const anchorTags = document.querySelectorAll('a')
  for (const anchorTag of anchorTags) {
    if (anchorTag.textContent?.startsWith('pic.twitter.com')) {
      anchorTag.outerHTML = ''
    } else if (anchorTag.textContent?.startsWith('#')) {
      anchorTag.outerHTML = ' ' + anchorTag.textContent
    } else {
      anchorTag.outerHTML = anchorTag.textContent ?? ''
    }
  }

  return document.innerHTML?.trim() ?? ''
}

/**
 * Count the number of images.
 * @param tweetHTML
 */
function countImages(tweetHTML: string): number {
  return (tweetHTML.match(/pic.twitter.com/g) ?? []).length
}

/**
 * Preprocess the URL.
 * @param url
 */
function preprocessURL(url: string): string {
  url = url.split('?')[0]

  if (url.match(/^\d+$/)) {
    url = 'https://twitter.com/trpfrog/status/' + url
  }

  if (url === '' || !(url.startsWith('https://twitter.com') || url.startsWith('https://x.com'))) {
    console.log('Invalid URL')
    process.exit(1)
  }

  return url
}

type FetchedTweet = z.infer<typeof BlogTwitterArchiveSchema>

/**
 * Fetch the tweet.
 * @param tweetUrl
 */
async function fetchTweet(tweetUrl: string) {
  tweetUrl = preprocessURL(tweetUrl)

  const FetchedTweetSchema = z.object({
    url: z.string().url(),
    author_name: z.string(),
    html: z.string(),
    author_url: z.string().url(),
  })

  const endpoint = createURL('/oembed', 'https://publish.twitter.com', {
    dnt: 'true',
    omit_script: 'true',
    url: tweetUrl,
  })

  const response = await fetch(endpoint)
  const rawContent = await response.json()
  const content = FetchedTweetSchema.parse(rawContent)

  const dom = new JSDOM(content.html)
  const document = dom.window.document
  const dateElement = document.querySelectorAll('a').item(document.querySelectorAll('a').length - 1)

  const rawTweet = document.querySelector('p')?.innerHTML ?? ''
  const images = countImages(rawTweet)
  const imagePrefix = 'https://res.cloudinary.com/trpfrog'

  return {
    id: content.url.split('/').pop() ?? '',
    date: formatDateToDisplay(dateElement.textContent ?? ''),
    tweet: beautifyTweet(rawTweet),
    name: content.author_name,
    userid: content.author_url.split('/').pop() ?? '',
    image: images >= 1 ? imagePrefix : undefined,
    image2: images >= 2 ? imagePrefix : undefined,
    image3: images >= 3 ? imagePrefix : undefined,
    image4: images >= 4 ? imagePrefix : undefined,
  } satisfies FetchedTweet
}

/**
 * Create a block for twitter-archived.
 * @param url
 */
async function createTweetBlock(url: string): Promise<void> {
  const result = await fetchTweet(url)
  const isTrpFrog = result.userid === 'TrpFrog'

  const createLine = (key: keyof typeof result) => {
    const value = result[key]
    return value ? `${String(key)}: ${result[key]}` : undefined
  }

  const resultCodeBlock = [
    '```twitter-archived',
    createLine('id'),
    !isTrpFrog && createLine('name'),
    !isTrpFrog && createLine('userid'),
    createLine('date'),
    createLine('tweet'),
    createLine('image'),
    createLine('image2'),
    createLine('image3'),
    createLine('image4'),
    '```',
  ]
    .filter(Boolean)
    .join('\n')

  console.log(resultCodeBlock)
  clipboardy.writeSync(resultCodeBlock)
}

const url = process.argv[2] // You can get the URL from command line arguments
if (url) {
  void createTweetBlock(url)
} else {
  // You can get the URL from clipboard
  void createTweetBlock(clipboardy.readSync())
}
