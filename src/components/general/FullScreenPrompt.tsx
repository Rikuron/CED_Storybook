import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const FullScreenPrompt = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { isMobile, isTablet } = useResponsive()

  useEffect(() => {
    // Only show on mobile/tablet devices
    if (isMobile || isTablet) {
      // Check if already fullscreen
      if (!document.fullscreenElement) {
        setIsVisible(true)
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      if (document.fullscreenElement) {
        setIsVisible(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [isMobile, isTablet])

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen?.()
      .then(() => setIsVisible(false))
      .catch(console.error)
  }

  const dismiss = () => {
    setIsVisible(false)
  }

  // Don't render on desktop or if already fullscreen
  if ((!isMobile && !isTablet) || isFullscreen) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10000 flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, delay: 2 }}
        >
          <span className="text-white text-sm">For the best experience</span>
          <button
            onClick={enterFullscreen}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer"
          >
            Go Fullscreen
          </button>
          <button
            onClick={dismiss}
            className="text-white/60 hover:text-white text-lg leading-none cursor-pointer"
            aria-label="Dismiss"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}