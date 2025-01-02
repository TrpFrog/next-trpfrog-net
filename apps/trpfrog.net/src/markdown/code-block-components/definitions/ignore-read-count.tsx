import { CustomCodeBlockComponent } from '../types'

export const ignoreReadCountCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    // This is a hack to make the read count not increase
    // using "read counter does not count inside of code blocks"
    return <Render markdown={markdown} />
  },
}
