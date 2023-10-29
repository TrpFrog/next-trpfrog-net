import dayjs from 'dayjs'
import matter from 'gray-matter'
import { z } from 'zod'

import { preprocessMarkdown } from '@blog/_lib/preprocessMarkdown'
import { getReadTimeSecond } from '@blog/_lib/readTime'

export type BlogPostBuildOption = {
  pagePos1Indexed?: number
  all?: boolean
  showPreviewCheckpoint?: boolean
  previewContentId?: string
  noContentNeeded?: boolean
}

// YYYY-MM-DD
const BlogDateSchema = z.coerce.date().transform(date => {
  return dayjs(date).format('YYYY-MM-DD')
})

export const blogFrontMatterSchema = z.object({
  title: z.string(),
  date: BlogDateSchema,
  updated: BlogDateSchema.optional(),
  held: BlogDateSchema.optional(),
  tags: z.string().default(''),
  description: z.string().optional(),
  thumbnail: z.string().url().optional(),
})

export type BlogFrontMatter = z.infer<typeof blogFrontMatterSchema>

export interface BlogPost extends BlogFrontMatter {
  slug: string
  readTime: number
  numberOfPhotos?: number
  held?: string
  previewContentId?: string
  isAll: boolean
  currentPage: number
  numberOfPages: number
  content: string[]
}

export function buildBlogPost(
  slug: string,
  markdownString: string,
  option?: BlogPostBuildOption,
): BlogPost {
  const matterResult = matter(markdownString)
  const pagePosition = option?.pagePos1Indexed ?? -1
  const frontMatter = blogFrontMatterSchema.parse(matterResult.data)

  const tags = frontMatter.tags
    .split(',')
    .map((t: string) => t.trim())
    .join()

  const numberOfPhotos = matterResult.content
    .split('\n')
    .filter(e => e.startsWith('![')).length

  const pageContent = option?.noContentNeeded
    ? []
    : preprocessMarkdown(matterResult.content, {
        concatenateAllPages: option?.all,
        pageIdx1Indexed: pagePosition,
      })

  const pageBreakRegex = /<!--+ page break --+>/g
  const numberOfPages = matterResult.content.split(pageBreakRegex).length

  return {
    slug,
    ...frontMatter,
    content: pageContent,
    tags,
    isAll: option?.all ?? false,
    numberOfPages,
    currentPage: pagePosition,
    readTime: getReadTimeSecond(matterResult.content),
    numberOfPhotos,
    previewContentId: option?.previewContentId,
  }
}

export const blogPostToMarkdown = (blogPost: BlogPost) => {
  const { content, ...rest } = blogPost
  const frontMatter = blogFrontMatterSchema.parse(rest)
  return matter.stringify(
    content.join('\n\n<!-- page break -->\n\n'),
    frontMatter,
  )
}
