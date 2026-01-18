import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const FullScreenPrompt = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

  const buttonSize = isMobile ? 32 : isTablet ? 36 : isTV ? 140 : 40
  const fontSize = isMobile ? '1rem' : isTablet ? '1.1rem' : isTV ? '4.5rem' : '1.25rem'
  const padding = isMobile ? '0.25rem 0.5rem' : isTablet ? '0.35rem 0.6rem' : isTV ? '1.75rem 2.5rem' : '0.5rem 0.75rem'
  const gap = isMobile ? '0.25rem' : isTablet ? '0.5rem' : isTV ? '2.5rem' : '0.75rem'
  const position = isMobile ? '0.5rem' : isTablet ? '0.75rem' : isTV ? '3rem' : '1rem'
  const rightOffset = isMobile ? '6.5rem' : isTablet ? '8.5rem' : isTV ? '28rem' : '11rem'

  useEffect(() => {
    const collapseTimer = setTimeout(() => setIsExpanded(false), 4000)

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    
    return () => {
      clearTimeout(collapseTimer)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const handleFullscreenClick = () => {
    if (isFullscreen) {
      document.exitFullscreen?.().catch(console.error)
    } else {
      document.documentElement.requestFullscreen?.().catch(console.error)
      setIsExpanded(false)
    }
  }

  if (!isMobile && !isTablet) return null

  return (
    <motion.div
      className="fixed z-9999 flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full"
      style={{ padding, gap, top: position, right: rightOffset }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.3 }}
      layout
    >
      {/* Text hint that fades out */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.span
              className="text-white text-sm whitespace-nowrap block"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              For best experience, go Fullscreen
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen button - always visible */}
      <button
        onClick={handleFullscreenClick}
        className="rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
        style={{ width: buttonSize, height: buttonSize }}
        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      >
        <span className="text-white" style={{ fontSize }}>⛶</span>
      </button>
    </motion.div>
  )
}