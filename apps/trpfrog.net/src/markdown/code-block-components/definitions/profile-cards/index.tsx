import { parseObjectList } from '@trpfrog.net/posts/parser'

import { CustomCodeBlockComponent } from '../../types'

import { ProfileCards, profileDataSchema } from './ProfileCards'

export const profileCardsCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown, context }) => {
    const profileDataList = parseObjectList(markdown)
      .map(e => profileDataSchema.safeParse(e))
      .filter(e => e.success)
      .map(e => e.data)

    return <ProfileCards profileDataList={profileDataList} held={context.blog?.held} />
  },
}
