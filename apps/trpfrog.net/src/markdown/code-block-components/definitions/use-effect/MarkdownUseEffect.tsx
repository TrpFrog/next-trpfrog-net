'use client'

import { useEffect } from 'react'

export function MarkdownUseEffect({ code }: { code: string }) {
  useEffect(() => {
    const userFunction = Function(code)
    const cleanup = userFunction()
    if (cleanup instanceof Function) {
      return cleanup
    }
  }, [code])
  return <></>
}
