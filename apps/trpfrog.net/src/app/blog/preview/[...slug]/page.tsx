import { Metadata } from 'next'

import {
  fetchPreviewBlogPost,
  createErrorArticle,
  ErrorablePost,
  createPreviewClient,
} from '@trpfrog.net/posts/preview'

import { env } from '@/env/server'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'

import { ArticleHeader } from '@blog/_components/ArticleHeader'
import { BlogMarkdown } from '@blog/_components/BlogMarkdown'

type Props = {
  params: Promise<{
    slug: [string, string | undefined]
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  if (!env.MICRO_CMS_API_KEY) {
    return {
      title: '記事プレビュー',
      robots: 'noindex, nofollow',
    }
  }
  const client = createPreviewClient({
    apiKey: env.MICRO_CMS_API_KEY,
    serviceDomain: 'trpfrog',
    endpoint: 'blog-preview',
  })

  const entry = await fetchPreviewBlogPost(client, params.slug[0])
  const metadata: Metadata = {
    title: '[記事プレビュー] ' + entry.title,
    robots: 'noindex, nofollow',
    description: entry.description,
  }
  if (entry.thumbnail) {
    metadata.openGraph = {
      images: [{ url: entry.thumbnail }],
    }
  }
  return metadata
}

async function fetchPreviewArticle(slug: [string, string | undefined]) {
  if (!env.MICRO_CMS_API_KEY) {
    return {
      entry: createErrorArticle('API Key is missing!'),
    }
  }

  const [id, page = '1'] = slug

  const option = {
    pagePos1Indexed: parseInt(page),
    all: page === 'all',
  }

  const client = createPreviewClient({
    apiKey: env.MICRO_CMS_API_KEY,
    serviceDomain: 'trpfrog',
    endpoint: 'blog-preview',
  })
  const entry = id
    ? ((await fetchPreviewBlogPost(client, id, option)) as ErrorablePost)
    : createErrorArticle('ID is missing!')

  return {
    entry,
  }
}

export default async function Index(props: Props) {
  const { entry: post } = await fetchPreviewArticle((await props.params).slug)

  return (
    <MainWrapper gridLayout>
      <ArticleHeader post={post} addEntryButtons={false} />
      <Block>
        {!post.isError && (
          <p
            style={{
              fontSize: '1.5em',
              color: 'var(--header-color)',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            記事プレビューです
            <br />
            URLを知っているユーザーのみが閲覧できます
          </p>
        )}
      </Block>
      <BlogMarkdown entry={post} />
    </MainWrapper>
  )
}
