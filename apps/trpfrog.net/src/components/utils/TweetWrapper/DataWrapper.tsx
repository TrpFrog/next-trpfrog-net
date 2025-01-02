'use client'
import { ReactNode } from 'react'

import { usePrefersColorScheme } from '@/hooks/usePrefersColorScheme'

export function TweetThemeDataWrapper({ children }: { children: ReactNode }) {
  const colorSchema = usePrefersColorScheme()
  return <div data-theme={colorSchema}>{children}</div>
}
