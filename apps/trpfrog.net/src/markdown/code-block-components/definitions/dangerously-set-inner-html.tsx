import { CustomCodeBlockComponent } from '../types'

export const dangerouslySetInnerHtmlCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown }) => {
    return <div dangerouslySetInnerHTML={{ __html: markdown }} />
  },
}
