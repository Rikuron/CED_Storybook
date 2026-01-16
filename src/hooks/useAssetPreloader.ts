import { useState, useEffect } from 'react'

interface PreloadResult {
  isLoaded: boolean
  progress: number
}

// Hook to preload a list of image assets.
export const useAssetPreloader = (assets: string[]): PreloadResult => {
  const [loadedCount, setLoadedCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (assets.length === 0) {
      setIsLoaded(true)
      return
    }

    let mounted = true
    setLoadedCount(0)
    setIsLoaded(false)

    const loadAsset = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          if (mounted) setLoadedCount((prev) => prev + 1)
          resolve()
        }
        img.onerror = () => {
          console.warn(`Failed to preload asset: ${src}`)
          if (mounted) setLoadedCount((prev) => prev + 1)
          resolve() // Still resolve to not block
        }
        img.src = src
      })
    }

    Promise.all(assets.map(loadAsset)).then(() => {
      if (mounted) setIsLoaded(true)
    })

    return () => { mounted = false }
  }, [assets.join(',')])

  return {
    isLoaded,
    progress: assets.length > 0 ? loadedCount / assets.length : 1
  }
}