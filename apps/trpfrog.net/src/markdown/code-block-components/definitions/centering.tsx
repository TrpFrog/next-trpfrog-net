import { ParseWithBudouX } from '@/lib/wordSplit'

import { CustomCodeBlockComponent } from '../types'

export const centeringCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    return (
      <div className="tw-text-center">
        <Render markdown={markdown} />
      </div>
    )
  },
}

export const centeringWithSizeCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const [size, ...lines] = markdown.split('\n')
    markdown = lines.join('\n')
    return (
      <div className="tw-text-center" style={{ fontSize: size.trim() }}>
        <Render markdown={markdown} />
      </div>
    )
  },
}

export const centeringWithSizeBoldCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown }) => {
    const [size, ...lines] = markdown.split('\n')
    markdown = lines.join('\n')
    return (
      <div className="tw-text-center" style={{ fontSize: size.trim() }}>
        <strong>
          <ParseWithBudouX str={markdown} />
        </strong>
      </div>
    )
  },
}
