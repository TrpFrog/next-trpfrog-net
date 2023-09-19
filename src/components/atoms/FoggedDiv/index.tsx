'use client'
import React from 'react'

import styles from './index.module.scss'

export type FoggedDivProps = React.ComponentPropsWithoutRef<'div'> & {
  height: number | string
  fogHeight?: number | string
}

export function FoggedDiv(props: FoggedDivProps) {
  const { className = '', children, height, fogHeight, ...rest } = props

  const cssPreviewHeight = typeof height === 'number' ? `${height}px` : height
  const cssFogHeight =
    typeof fogHeight === 'number' ? `${fogHeight}px` : fogHeight ?? '100px'

  return (
    <div
      className={`${styles.main} ${className}`}
      style={{ maxHeight: cssPreviewHeight }}
      {...rest}
    >
      {children}
      <div
        className={styles.fog}
        style={{ height: `min(${cssFogHeight}, ${cssPreviewHeight})` }}
      />
    </div>
  )
}
