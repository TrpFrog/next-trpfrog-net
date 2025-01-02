import { Metadata } from 'next'

import { z } from 'zod'

import { env } from '@/env/server.ts'

import { BlogMarkdown } from '@blog/_components/BlogMarkdown'
import { DevBlogMarkdown } from '@blog/_components/DevBlogMarkdown'
import { fetchPost } from '@blog/rpc'

export const dynamicParams = true

// 1, 2, 3, ... or 'all'
const pageNumberSchema = z.coerce.number().int().positive().or(z.literal('all'))

const paramsSchema = z.object({
  slug: z.string(),
  options: z.tuple([z.string().pipe(pageNumberSchema)]).default(['1']),
})
type PageProps = {
  params: Promise<z.input<typeof paramsSchema>>
}

export async function generateStaticParams(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const entry = await fetchPost(slug)
  const paths: { options?: string[] }[] = []
  for (let i = 1; i <= entry.numberOfPages; i++) {
    paths.push({ options: [i.toString()] })
  }
  paths.push({ options: ['all'] })
  paths.push({ options: undefined })

  return paths
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params

  const { slug } = params

  const { title, description } = await fetchPost(slug)

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      locale: 'ja-JP',
      siteName: title,
      description,
      type: 'website',
      images: [{ url: `/blog/${slug}/og-image` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@TrpFrog',
      creator: '@TrpFrog',
    },
  }

  return metadata
}

export default async function Index(props: PageProps) {
  const rawParams = await props.params
  const {
    slug,
    options: [page],
  } = paramsSchema.parse(rawParams)

  const entry = await fetchPost(slug, page)
  return env.NODE_ENV === 'production' || env.USE_DEV_REALTIME_BLOG_PREVIEW !== 'true' ? (
    <BlogMarkdown entry={entry} />
  ) : (
    <DevBlogMarkdown slug={slug} page={page} />
  )
}
