'use server'

import { BlogPost, InvalidPagePositionError } from '@trpfrog.net/posts'
import { notFound } from 'next/navigation'
import { match } from 'ts-pattern'
import { z } from 'zod'

import { BlogMarkdown } from '@blog/_components/BlogMarkdown'

const pageNumberSchema = z.number().int().positive().or(z.literal('all')).catch(1)

export async function renderBlog(slug: string, page?: number | 'all') {
  page = pageNumberSchema.parse(page)
  try {
    const { readBlogPost } = await import('@trpfrog.net/posts/fs')
    const entry: BlogPost = await match(page)
      .with('all', () => readBlogPost(slug, { all: true }))
      .otherwise(page => readBlogPost(slug, { pagePos1Indexed: page }))
    return <BlogMarkdown entry={entry} />
  } catch (e) {
    if (e instanceof InvalidPagePositionError) {
      return notFound()
    }
  }
}
