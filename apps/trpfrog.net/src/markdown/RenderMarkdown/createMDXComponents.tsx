import React from 'react'

import 'katex/dist/katex.min.css'
import { MDXComponents } from 'mdx/types'

import { InlineLink } from '@/components/atoms/InlineLink'
import * as Wrapper from '@/components/wrappers'

import { twJoin, twMerge } from '@/lib/tailwind/merge'

import { BlogH2 } from '@blog/_components/BlogH2'
import { BlogImage } from '@blog/_components/BlogImage'
import styles from '@blog/_styles/blog.module.css'

import { createCodeComponent } from './createCodeComponent'

import { MarkdownContext } from '@/markdown/types'

export function createMDXComponents(options?: {
  inline?: boolean
  openInNewTab?: 'always' | 'external' | 'never'
  context?: MarkdownContext
}): MDXComponents {
  return {
    pre: ({ children }) => <div className={''}>{children}</div>, // disable pre tag

    code: createCodeComponent(options?.context),

    img: props => {
      return (
        <div className={styles.img}>
          <BlogImage
            src={props.src ?? ''}
            alt={props.alt ?? ''}
            caption={props.title}
            spoiler={'data-spoiler' in props}
          />
        </div>
      )
    },

    p: props => {
      const Tag = options?.inline ? 'span' : 'p'
      return <Tag {...props} />
    },

    h2: ({ ref, ...props }) => <BlogH2 {...props} />,
    h3: ({ ref, ...props }) => <Wrapper.H3 {...props} className="tw-mt-8" />,
    h4: ({ ref, ...props }) => <Wrapper.H4 {...props} />,
    h5: ({ ref, ...props }) => <Wrapper.H5 {...props} />,

    ul: ({ ref, ...props }) => <Wrapper.UnorderedList {...props} />,
    ol: ({ ref, ...props }) => <Wrapper.OrderedList {...props} />,
    li: ({ ref, ...props }) => <Wrapper.Li {...props} />,

    a: props => (
      <InlineLink
        openInNewTab={props.href?.startsWith('javascript:') ? false : options?.openInNewTab}
        href={props.href}
      >
        {props.children}
      </InlineLink>
    ),

    kbd: props => {
      const { ref, ...rest } = props
      return <Wrapper.Kbd {...rest} />
    },

    blockquote: props => {
      const { className = '', ...rest } = props
      return <blockquote className={twJoin(styles.blockquote, className)} {...rest} />
    },

    details: props => {
      const { ref, className = '', ...rest } = props
      return <details className={twJoin(styles.details, className)} {...rest} />
    },

    summary: props => {
      const { ref, className = '', ...rest } = props
      return <summary className={twJoin(styles.summary, className)} {...rest} />
    },

    video: props => <BlogImage src={props.src ?? ''} alt="" caption={props.title} isVideo />,

    hr: props => {
      const { ref, className = '', ...rest } = props
      return <Wrapper.HorizontalRule className={className} {...rest} />
    },

    table: props => {
      const { ref, className, ...rest } = props
      return <Wrapper.Table className={twMerge('tw-mx-auto', className)} {...rest} />
    },
  }
}
