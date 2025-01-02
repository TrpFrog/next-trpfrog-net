import { CustomCodeBlockComponent } from '../../types'

import { MarkdownUseEffect } from './MarkdownUseEffect'

export const markdownUseEffectCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown }) => {
    return <MarkdownUseEffect code={markdown} />
  },
}
