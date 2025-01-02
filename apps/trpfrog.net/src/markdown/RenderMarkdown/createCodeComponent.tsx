import React, { ReactNode, ComponentProps } from 'react'

import 'katex/dist/katex.min.css'

import { env } from '@/env/server'

import { CodeBlock } from '@/components/molecules/CodeBlock'

import styles from '@blog/_styles/blog.module.css'

import type { MarkdownContext } from '@/markdown/types'

import {
  isValidCustomCodeBlockComponentName,
  RenderCustomCodeBlockComponent,
} from '@/markdown/code-block-components'

function parseLanguageName(className: string) {
  const rawLanguage = className.replace('language-', '')
  if (rawLanguage.includes(':')) {
    return {
      lang: rawLanguage.split(':')[0],
      fileName: rawLanguage.split(':')[1],
      url: rawLanguage.split(':').slice(2).join(':'),
    }
  } else if (rawLanguage.includes('.')) {
    return {
      lang: rawLanguage.split('.').slice(-1)[0],
      fileName: rawLanguage,
    }
  } else {
    return {
      lang: rawLanguage,
      fileName: '',
    }
  }
}

export function createCodeComponent(context: MarkdownContext = {}) {
  return function MarkdownCode(props: ComponentProps<'code'>): ReactNode {
    let children = props.children

    // unwrap children if it's an array
    if (Array.isArray(children) && children.length > 0 && typeof children[0] === 'string') {
      children = children[0]
    }

    // return as inline code block
    if (
      typeof children !== 'string' || // content is not string
      ('inline' in props && props.inline) || // inline code
      (!props.className && !children.includes('\n')) // no language and single line
    ) {
      return <code className={styles.inline_code_block}>{children}</code>
    }

    // prettier-ignore
    const { lang, fileName, url } = parseLanguageName(props.className ?? '')

    if (isValidCustomCodeBlockComponentName(lang)) {
      const isDevClient = env.NODE_ENV === 'development' && typeof window !== 'undefined'
      return (
        <RenderCustomCodeBlockComponent
          name={lang}
          markdown={children as string}
          context={context}
          useDevComponent={isDevClient}
        />
      )
    }

    return (
      <CodeBlock language={lang} fileName={fileName} url={url} className="tw-my-4">
        {children as string}
      </CodeBlock>
    )
  }
}
