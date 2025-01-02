import { components } from './components'

import type { MarkdownContext } from '@/markdown/types'

type ComponentKeys = keyof typeof components

/**
 * code block component として存在しているかどうかを判定する
 * @param name
 */
export function isValidCustomCodeBlockComponentName(name: string): name is ComponentKeys {
  return name in components
}

export async function RenderCustomCodeBlockComponent(props: {
  name: ComponentKeys
  markdown: string
  context: MarkdownContext
  useDevComponent?: boolean
}) {
  async function Render(rendererProps: { markdown: string; mode?: 'block' | 'inline' }) {
    const { RenderMarkdown } = await import('@/markdown/RenderMarkdown')
    const { markdown, mode = 'block' } = rendererProps
    return <RenderMarkdown markdown={markdown} mode={mode} context={props.context} />
  }

  const comp = components[props.name]
  if (!comp) {
    return <></>
  }

  const TargetComponent =
    // eslint-disable-next-line n/no-process-env
    process.env.NODE_ENV === 'development' && props.useDevComponent && comp.DevComponent
      ? comp.DevComponent
      : comp.Component

  return <TargetComponent markdown={props.markdown} context={props.context} Render={Render} />
}
