import { ReactNode, use, useDeferredValue, useEffect, useState } from 'react'

import { createClient as createMdWatchClient } from '@trpfrog.net/dev-blog-server'

import { ArticleSkeleton } from '@blog/[slug]/_components/ArticleSkeleton'
import { renderBlog } from '@blog/_components/DevBlogMarkdown/actions/renderBlog'

const initializing = Symbol('trpfrog.net/blog-renderer:initializing')

type DevServerRenderedBlogResult =
  | {
      isLoading: true
    }
  | {
      isLoading: false
      rendered: ReactNode
    }

export function useDevServerRenderedBlog(
  slug: string,
  page?: number | 'all',
): DevServerRenderedBlogResult {
  const [articleJSX, setArticleJSX] = useState<ReactNode | typeof initializing>(initializing)
  const deferredArticleJSX = useDeferredValue(articleJSX)

  useEffect(() => {
    // initial render
    renderBlog(slug, page).then(setArticleJSX)

    const socket = createMdWatchClient()

    socket
      ?.on('connect', () => {
        console.log('Markdown server connected')
      })
      .on('disconnect', () => {
        console.log('Markdown server disconnected')
      })
      // re-render on update
      .on('update', (slug: string) => {
        if (slug === slug) {
          renderBlog(slug, page).then(setArticleJSX)
        }
      })

    // cleanup
    return () => {
      socket?.disconnect()
    }
  }, [page, slug])

  const isLoading = deferredArticleJSX === initializing
  return {
    isLoading,
    rendered: isLoading ? undefined : deferredArticleJSX,
  }
}

export function DevServerBlogRenderer(props: { slug: string; page?: number | 'all' }) {
  const [articleJSX, setArticleJSX] = useState<Promise<ReactNode>>(
    Promise.resolve(<ArticleSkeleton />),
  )

  useEffect(() => {
    const socket = createMdWatchClient()
    setArticleJSX(renderBlog(props.slug, props.page))
    socket
      ?.on('connect', () => {
        console.log('Markdown server connected')
      })
      .on('disconnect', () => {
        console.log('Markdown server disconnected')
      })
      // re-render on update
      .on('update', (slug: string) => {
        if (slug === props.slug) {
          setArticleJSX(renderBlog(props.slug, props.page))
        }
      })

    // cleanup
    return () => {
      socket?.disconnect()
    }
  }, [props.page, props.slug])

  return use(articleJSX)
}
