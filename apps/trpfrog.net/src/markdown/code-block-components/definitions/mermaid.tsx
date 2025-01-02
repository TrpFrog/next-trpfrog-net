import { StyledMermaid } from '@/components/utils/Mermaid'

import { CustomCodeBlockComponent } from '../types'

export const mermaidCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown }) => {
    return <StyledMermaid chart={markdown} />
  },
}
