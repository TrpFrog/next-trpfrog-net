import { CustomCodeBlockComponent } from '../../types'

import { InnerAutoYouTube, InnerYouTube } from './InnerYouTube'

export const youtubeCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown }) => <InnerYouTube content={markdown} />,
}

export const autoYouTubeCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown }) => <InnerAutoYouTube content={markdown} />,
}
