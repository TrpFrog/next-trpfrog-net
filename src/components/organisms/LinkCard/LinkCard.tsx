import * as React from 'react'

import { Hostname } from '@/components/organisms/LinkCard/Hostname'
import { A } from '@/components/wrappers'

import { tv } from '@/lib/tailwind/variants'
import { createURL } from '@/lib/url'

export const createLinkCardStyles = tv({
  slots: {
    wrapper: 'tw-@container',
    layout: [
      'tw-flex tw-justify-between tw-leading-none',
      'tw-overflow-clip tw-rounded-xl tw-bg-window-color tw-text-sm',
      'tw-border tw-border-zinc-300 hover:tw-brightness-95',
      'tw-flex-col-reverse @md:tw-h-32 @md:tw-flex-row',
    ],
    textArea:
      'tw-relative tw-grid tw-flex-auto tw-grid-rows-[1rem_auto] tw-gap-3 tw-p-4',
    image: [
      'tw-aspect-video tw-h-full tw-object-cover',
      'tw-border-b tw-border-b-zinc-300',
      '@md:tw-border-b-0 @md:tw-border-l @md:tw-border-l-zinc-300',
    ],
    titles: 'tw-flex tw-flex-col tw-justify-center tw-gap-1',
    title: 'tw-line-clamp-2 tw-font-bold',
    description: 'tw-line-clamp-2 tw-text-xs tw-leading-tight tw-opacity-60',
  },
  variants: {
    noImage: {
      true: {
        image: `
          tw-flex tw-items-center tw-justify-center 
          tw-bg-trpfrog-50 tw-text-2xl tw-font-bold tw-text-trpfrog-400
        `,
      },
    },
  },
})

export type LinkCardProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  title: string
  description?: string
  imageUrl?: string
  favicon?: string
  href: string
  themeColor?: string
  skeleton?: false
}

export function LinkCard(props: LinkCardProps) {
  let {
    className,
    favicon,
    title,
    description = '',
    imageUrl,
    href,
    themeColor,
    ...rest
  } = props

  const styles = createLinkCardStyles({ noImage: !imageUrl })

  const origin = new URL(href).origin
  if (imageUrl && !imageUrl.startsWith('http')) {
    imageUrl = createURL(imageUrl, origin)
  }

  return (
    <A href={href} className={styles.wrapper({ className })} openInNewTab>
      <div className={styles.layout()}>
        <div className={styles.textArea()}>
          <Hostname href={href} favicon={favicon} />
          <div className={styles.titles()}>
            <div className={styles.title()}>{title}</div>
            {description && (
              <div className={styles.description()}>{description}</div>
            )}
          </div>
        </div>
        {imageUrl ? (
          <img
            className={styles.image()}
            alt=""
            src={imageUrl}
            loading="lazy"
          />
        ) : (
          <div className={styles.image()}>NO IMAGE</div>
        )}
      </div>
    </A>
  )
}
