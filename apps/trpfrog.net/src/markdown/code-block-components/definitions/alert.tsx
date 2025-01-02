import { parseTitleAndBody } from '@trpfrog.net/posts/parser'

import { Alert } from '@/components/atoms/Alert'

import { CustomCodeBlockComponent } from '../types'

export const cautionCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const { title, body } = parseTitleAndBody(markdown)
    return (
      <Alert type={'caution'}>
        <h4>{title}</h4>
        <Render markdown={body} />
      </Alert>
    )
  },
}

export const infoboxCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const { title, body } = parseTitleAndBody(markdown)
    return (
      <Alert type={'frog'}>
        <h4>{title}</h4>
        <Render markdown={body} />
      </Alert>
    )
  },
}
