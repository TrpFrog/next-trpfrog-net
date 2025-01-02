import { useEffect } from 'react'

export function useHeightAdjustedScrollOnResize() {
  useEffect(() => {
    let documentHeight = -1

    const handleResize = () => {
      if (documentHeight === -1) {
        // Initialize document height
        documentHeight = document.documentElement.offsetHeight
        return
      }

      window.requestAnimationFrame(() => {
        const nextHeight = document.documentElement.offsetHeight
        const heightDifference = nextHeight - documentHeight
        documentHeight = nextHeight

        // Ignore large height differences
        if (Math.abs(heightDifference) <= 1000) {
          window.scrollBy(0, heightDifference)
        }
      })
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(document.body)

    return () => resizeObserver.disconnect()
  }, [])
}
