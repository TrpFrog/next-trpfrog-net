import { memo, CSSProperties } from 'react'

import { BlogPost } from '@trpfrog.net/posts'

import { Block } from '@/components/molecules/Block'

import { PageNavigation } from '@blog/_components/PageNavigation'
import styles from '@blog/_styles/blog.module.css'

import { RenderMarkdown } from '@/markdown/RenderMarkdown'

type Props = {
  entry: BlogPost
  style?: CSSProperties
  className?: string
}

export const BlogMarkdown = memo(function InnerBlogMarkdown(props: Props) {
  const { entry, style, className } = props
  const markdown = entry.content

  return (
    <>
      {markdown.map((content, idx) => (
        <Block key={'window-' + idx} style={style} className={className}>
          {idx === 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <span id={'article'} />
              <PageNavigation entry={entry} doNotShowOnFirst={true} />
            </div>
          )}
          <article className={styles.post} style={{ wordBreak: 'break-word' }}>
            <RenderMarkdown markdown={content} mode="block" context={{ blog: entry }} />
          </article>
          {idx === markdown.length - 1 && (
            <div style={{ marginTop: '1rem' }}>
              <PageNavigation entry={entry} />
            </div>
          )}
        </Block>
      ))}
    </>
  )
})
