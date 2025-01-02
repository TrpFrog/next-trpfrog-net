import { CustomCodeBlockComponent } from '../../types'

import { ShowAllComponent } from './ShowAllComponent'

export const deprecatedShowAllCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const [first, second] = markdown.split(/\n---+\n/)
    return (
      <ShowAllComponent preview={<Render markdown={first} />}>
        <Render markdown={second} />
      </ShowAllComponent>
    )
  },
}
