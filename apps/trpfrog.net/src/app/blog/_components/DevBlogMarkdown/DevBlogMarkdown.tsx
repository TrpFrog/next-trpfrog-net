'use client'

import { ImageDragAndDropUploader } from '@blog/_components/DevBlogMarkdown/ImageDragAndDrop.tsx'

import { ArticleSkeleton } from '../../[slug]/_components/ArticleSkeleton'

import { useDevServerRenderedBlog } from './hooks/useDevServerRenderedBlog'
import { useHeightAdjustedScrollOnResize } from './hooks/useHeightAdjustedScrollOnResize'

type DevBlogMarkdownProps = {
  slug: string
  page?: number | 'all'
}

export function DevBlogMarkdown(props: DevBlogMarkdownProps) {
  const res = useDevServerRenderedBlog(props.slug, props.page)
  useHeightAdjustedScrollOnResize()

  if (res.isLoading) {
    return <ArticleSkeleton />
  }

  // Returns stale article while fetching
  return (
    <>
      {res.rendered}
      <ImageDragAndDropUploader slug={props.slug} />
    </>
  )
}
