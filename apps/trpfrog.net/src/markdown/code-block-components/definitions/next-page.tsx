import { PageTransferButton } from '@blog/_components/PageNavigation'

import { CustomCodeBlockComponent } from '../types'

export const nextPageCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown, context }) => {
    if (!context.blog) return <></>
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ margin: '1em 0' }}>
          <PageTransferButton
            entry={context.blog}
            nextPage={context.blog.currentPage + 1}
            buttonText={`Next: ${markdown} →`}
          />
        </div>
      </div>
    )
  },
}
