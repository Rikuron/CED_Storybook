import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface MusicToggleProps {
  isPlaying: boolean
  volume: number
  onToggle: () => void
  onVolumeChange: (volume: number) => void
}

export const MusicToggle = ({ 
  isPlaying, 
  volume, 
  onToggle, 
  onVolumeChange 
}: MusicToggleProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

  // Sizes: mobile -> tablet -> desktop -> TV (4K)
  const buttonSize = isMobile ? 32 : isTablet ? 36 : isTV ? 140 : 40
  const fontSize = isMobile ? '1rem' : isTablet ? '1.1rem' : isTV ? '4.5rem' : '1.25rem'
  const sliderWidth = isMobile ? 48 : isTablet ? 60 : isTV ? 300 : 80
  const padding = isMobile ? '0.25rem 0.5rem' : isTablet ? '0.35rem 0.6rem' : isTV ? '1.75rem 2.5rem' : '0.5rem 0.75rem'
  const gap = isMobile ? '0.25rem' : isTablet ? '0.5rem' : isTV ? '2.5rem' : '0.75rem'
  const position = isMobile ? '0.5rem' : isTablet ? '0.75rem' : isTV ? '3rem' : '1rem'

  return (
    <motion.div
      className="fixed z-9999 flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full"
      style={{ padding, gap, top: position, right: position }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onToggle}
        className="rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
        style={{ width: buttonSize, height: buttonSize }}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <span style={{ fontSize }}>🔊</span>
        ) : (
          <span style={{ fontSize }}>🔇</span>
        )}
      </button>

      <AnimatePresence>
        {isHovered && isPlaying && (
          <motion.input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, rgba(255, 255, 255, 0.3) ${volume * 100}%, rgba(255, 255, 255, 0.3) 100%)`
            }}
            title="Volume"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: sliderWidth, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}