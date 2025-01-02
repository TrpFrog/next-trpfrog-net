import { CSSProperties } from 'react'
import * as React from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ImageWithModal } from '@blog/_components/BlogImage/ImageWithModal'

import styles from './index.module.css'

type BlogImageProps = {
  src: string
  alt: string
  caption?: string
  spoiler?: boolean
  isVideo?: boolean
  style?: CSSProperties
}

export const ImageCaption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className={styles.caption}>{children}</figcaption>
)

async function TakenBy(props: { photographer: string }) {
  const { RenderMarkdown } = await import('@/markdown/RenderMarkdown')
  return (
    <div className={styles.taken_by}>
      <small>
        <FontAwesomeIcon icon={faCamera} /> 撮影:{' '}
        <RenderMarkdown markdown={props.photographer} mode="inline" />
      </small>
    </div>
  )
}

export async function BlogImage({ src, alt, style, spoiler, isVideo, ...props }: BlogImageProps) {
  const { RenderMarkdown } = await import('@/markdown/RenderMarkdown')
  let caption = props.caption ?? ''
  let takenBy: string | undefined

  const takenByIdentifier = 'taken-by:'
  if (caption.includes(takenByIdentifier)) {
    ;[caption, takenBy] = caption.split(takenByIdentifier).map(e => e.trim())
  }

  if (isVideo && spoiler) {
    throw new Error('Video with spoiler is not supported.')
  }

  return (
    <>
      <figure className={styles.img_wrapper} style={style}>
        {takenBy && <TakenBy photographer={takenBy} />}
        {isVideo ? (
          <video src={src} controls className={styles.video} />
        ) : (
          <ImageWithModal src={src} alt={alt} spoiler={spoiler} />
        )}
        {caption && (
          <ImageCaption>
            <RenderMarkdown markdown={caption} mode="inline" />
          </ImageCaption>
        )}
      </figure>
    </>
  )
}
