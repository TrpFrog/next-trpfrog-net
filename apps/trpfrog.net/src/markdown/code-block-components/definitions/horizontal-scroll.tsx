import { CustomCodeBlockComponent } from '../types'

export const horizontalScrollCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    const contents = markdown.split('\n\n').filter(e => e.trim() !== '')
    return (
      <div
        style={{
          display: 'flex',
          overflowX: 'scroll',
          gap: '1em',
          whiteSpace: 'nowrap',
        }}
      >
        {contents.map((e, idx) => (
          <div
            key={'horizontal-element-key-' + idx}
            style={{ display: 'inline-block', whiteSpace: 'initial' }}
          >
            <Render markdown={e} />
          </div>
        ))}
      </div>
    )
  },
}
