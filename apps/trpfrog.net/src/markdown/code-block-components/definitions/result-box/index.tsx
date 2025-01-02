import { parseColonSeparatedList } from '@trpfrog.net/posts/parser'

import { CustomCodeBlockComponent } from '../../types'

import { ResultBox } from './ResultBox'

export const resultBoxCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown }) => {
    const data = parseColonSeparatedList(markdown)
    return <ResultBox record={data} />
  },
}
