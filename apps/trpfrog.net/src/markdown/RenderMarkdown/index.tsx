import 'katex/dist/katex.min.css'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import { createMDXComponents } from './createMDXComponents'

import { type MarkdownContext } from '@/markdown/types'

export function RenderMarkdown(props: {
  markdown: string
  mode: 'block' | 'inline'
  context?: MarkdownContext
}) {
  return (
    <MDXRemote
      source={props.markdown}
      components={createMDXComponents({
        inline: props.mode === 'inline',
        context: props.context,
      })}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkMath,
            remarkUnwrapImages,
            () => remarkToc({ heading: '目次' }),
          ],
          rehypePlugins: [rehypeKatex, rehypeRaw, rehypeSlug],
          format: 'md',
        },
      }}
    />
  )
}
