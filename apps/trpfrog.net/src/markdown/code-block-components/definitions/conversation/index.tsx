import { Talk } from '@/components/atoms/Talk'

import { parseConversation } from './parse'

import { CustomCodeBlockComponent } from '@/markdown/code-block-components/types'

export const conversationCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const conversation = parseConversation(markdown)
    return (
      <Talk style={{ margin: '1rem' }}>
        {conversation.map(({ speaker, comment, outOfComment }, idx) => (
          <Talk.Item key={speaker + '-' + idx} speaker={speaker} outOfComment={outOfComment}>
            {comment ? (
              <Render markdown={comment} mode="inline" />
            ) : (
              // スペースが入っていないとスタイルが崩れるので、&nbsp;を入れる
              <>&nbsp;</>
            )}
          </Talk.Item>
        ))}
      </Talk>
    )
  },
}
