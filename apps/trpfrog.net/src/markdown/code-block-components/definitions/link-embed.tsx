import { ClientLinkCard } from '@/components/organisms/LinkCard/ClientLinkCard'
import { ServerLinkCard } from '@/components/organisms/LinkCard/ServerLinkCard'

import { CustomCodeBlockComponent } from '../types'

export const linkEmbedCCBC: CustomCodeBlockComponent = {
  Component: async function InnerLinkEmbed({ markdown, Render }) {
    const [url, ...captionArr] = markdown.split('\n')
    return (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <ServerLinkCard
          href={url}
          style={{
            width: '100%',
          }}
        />
        {captionArr.length > 0 && (
          <div style={{ opacity: 0.8, margin: '0 0 1rem', lineHeight: 1.25 }}>
            <small>
              <Render markdown={captionArr.join('\n').trim()} mode="inline" />
            </small>
          </div>
        )}
      </div>
    )
  },
  DevComponent: async function InnerLinkEmbed({ markdown, Render }) {
    const [url, ...captionArr] = markdown.split('\n')
    return (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <ClientLinkCard
          href={url}
          style={{
            width: '100%',
          }}
        />
        {captionArr.length > 0 && (
          <div style={{ opacity: 0.8, margin: '0 0 1rem', lineHeight: 1.25 }}>
            <small>
              <Render markdown={captionArr.join('\n').trim()} mode="inline" />
            </small>
          </div>
        )}
      </div>
    )
  },
}
