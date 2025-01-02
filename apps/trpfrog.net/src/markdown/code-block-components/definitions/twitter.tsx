import { Tweet } from '@/components/utils/TweetWrapper'

import { CustomCodeBlockComponent } from '../types'

export const twitterCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown }) => {
    const id = markdown.split('\n')[0]
    return <Tweet id={id} />
  },
}
