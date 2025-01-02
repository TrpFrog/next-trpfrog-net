import { z } from 'zod'

import { TwitterImageData } from '@/components/atoms/twitter/TwitterImage'
import { TwitterArchivedProps } from '@/components/organisms/TwitterArchived'

import { formatDateToDisplay } from '@/lib/date'

export const BlogTwitterArchiveSchema = z.object({
  name: z.string().default('つまみ'),
  userid: z.string().default('TrpFrog'),
  color: z.string().optional(),
  tweet: z.string().optional(),
  reply: z.string().optional(),
  id: z.string(),
  date: z.coerce.date().transform(date => formatDateToDisplay(date)),
  image: z.string().optional(),
  image2: z.string().optional(),
  image3: z.string().optional(),
  image4: z.string().optional(),
})

export function generateTwitterArchiveProps(rawTweetData: unknown): TwitterArchivedProps {
  const parsed = BlogTwitterArchiveSchema.passthrough().safeParse(rawTweetData)
  if (!parsed.success) {
    throw parsed.error
  }
  const tweetData = parsed.data

  const images: TwitterImageData[] = [
    tweetData.image ?? '',
    tweetData.image2 ?? '',
    tweetData.image3 ?? '',
    tweetData.image4 ?? '',
  ]
    .filter(Boolean)
    .map(src => ({
      src,
      alt: 'ツイートの画像',
    }))

  const tweet = tweetData.reply ? tweetData.reply + ' ' + tweetData.tweet : tweetData.tweet

  const rawQuoteTweetData = Object.fromEntries(
    Object.entries(tweetData)
      .filter(([key]) => key.startsWith('quote-'))
      .map(([key, value]) => [key.replace('quote-', ''), value]),
  )

  return {
    author: tweetData.name,
    screenName: tweetData.userid,
    iconStyle: tweetData.color,
    tweet,
    id: tweetData.id,
    date: tweetData.date,
    images,
    quote:
      Object.entries(rawQuoteTweetData).length > 0
        ? generateTwitterArchiveProps(rawQuoteTweetData)
        : undefined,
  }
}
