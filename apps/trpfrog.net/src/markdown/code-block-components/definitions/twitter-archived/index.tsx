import * as React from 'react'

import { parseColonSeparatedDict } from '@trpfrog.net/posts/parser'
import { z } from 'zod'

import { env } from '@/env/server'

import { ErrorFallback } from '@/components/atoms/ErrorFallback'
import { TwitterArchived, TwitterArchivedProps } from '@/components/organisms/TwitterArchived'

import { CustomCodeBlockComponent } from '../../types'

import { generateTwitterArchiveProps } from './generateTwitterArchiveProps'

function Fallback(props: { content: string; error: z.ZodError }) {
  if (env.NODE_ENV === 'development') {
    return (
      <ErrorFallback title={'TwitterArchive: Error Occurred'}>{props.error.message}</ErrorFallback>
    )
  } else {
    console.error('\n```twitter-archived')
    console.error(props.content.trim())
    console.error('```\n')
    throw props.error
  }
}

export const twitterArchivedCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown }) => {
    const rawTweetData = parseColonSeparatedDict(markdown)
    let props: TwitterArchivedProps
    try {
      props = generateTwitterArchiveProps(rawTweetData)
    } catch (error) {
      return <Fallback content={markdown} error={error as z.ZodError} />
    }
    return <TwitterArchived {...props} />
  },
}
