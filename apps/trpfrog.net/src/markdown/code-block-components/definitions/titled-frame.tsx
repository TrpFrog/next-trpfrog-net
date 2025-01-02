import { parseTitleAndBody } from '@trpfrog.net/posts/parser'

import { CustomCodeBlockComponent } from '../types'

export const titledFrameCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const { title, body } = parseTitleAndBody(markdown)
    return (
      <div style={{ transform: 'translateY(calc(-1 * (1em + 5px) / 2))' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              borderRadius: 100,
              border: '3px solid var(--header-color)',
              background: 'var(--window-bkg-color)',
              fontWeight: 'bold',
              padding: '2px 15px',
              transform: 'translateY(calc(1em + 5px))',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            border: '3px solid var(--header-color)',
            padding: '1.5em 1em 1em',
            borderRadius: 10,
          }}
        >
          <Render markdown={body} />
        </div>
      </div>
    )
  },
}
