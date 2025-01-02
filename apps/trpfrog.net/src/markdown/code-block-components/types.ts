import { ReactNode } from 'react'

import { BlogPost } from '@trpfrog.net/posts'

type CustomCodeBlockComponentProps = {
  markdown: string
  context: { blog?: BlogPost }
  Render: (props: { markdown: string; mode?: 'block' | 'inline' }) => ReactNode
}

export interface CustomCodeBlockComponent {
  Component: (props: CustomCodeBlockComponentProps) => ReactNode
  DevComponent?: (props: CustomCodeBlockComponentProps) => ReactNode
}
