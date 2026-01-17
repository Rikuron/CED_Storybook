import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface SoundControlsProps {
  // Music controls
  isMusicPlaying: boolean
  musicVolume: number
  onMusicToggle: () => void
  onMusicVolumeChange: (volume: number) => void
  // Voiceover controls
  isVoiceoverEnabled: boolean
  voiceoverVolume: number
  onVoiceoverToggle: () => void
  onVoiceoverVolumeChange: (volume: number) => void
}

export const SoundControls = ({
  isMusicPlaying,
  musicVolume,
  onMusicToggle,
  onMusicVolumeChange,
  isVoiceoverEnabled,
  voiceoverVolume,
  onVoiceoverToggle,
  onVoiceoverVolumeChange
}: SoundControlsProps) => {
  const [hoveredControl, setHoveredControl] = useState<'music' | 'voiceover' | null>(null)
  const { isMobile, isTablet, isTV } = useResponsive()

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
    >
      {/* Music Toggle */}
      <div 
        className="flex items-center"
        style={{ gap }}
        onMouseEnter={() => setHoveredControl('music')}
        onMouseLeave={() => setHoveredControl(null)}
      >
        <button
          onClick={onMusicToggle}
          className="rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
          style={{ width: buttonSize, height: buttonSize }}
          title={isMusicPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isMusicPlaying ? (
            <span style={{ fontSize }}>🔊</span>
          ) : (
            <span style={{ fontSize }}>🔇</span>
          )}
        </button>

        <AnimatePresence>
          {hoveredControl === 'music' && isMusicPlaying && (
            <motion.input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={musicVolume}
              onChange={(e) => onMusicVolumeChange(parseFloat(e.target.value))}
              className="volume-slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${musicVolume * 100}%, rgba(255, 255, 255, 0.3) ${musicVolume * 100}%, rgba(255, 255, 255, 0.3) 100%)`
              }}
              title="Music Volume"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: sliderWidth, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div 
        className="bg-white/30" 
        style={{ 
          width: isMobile ? 1 : isTV ? 4 : 2, 
          height: buttonSize * 0.6 
        }} 
      />

      {/* Voiceover Toggle */}
      <div 
        className="flex items-center"
        style={{ gap }}
        onMouseEnter={() => setHoveredControl('voiceover')}
        onMouseLeave={() => setHoveredControl(null)}
      >
        <button
          onClick={onVoiceoverToggle}
          className="rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
          style={{ width: buttonSize, height: buttonSize }}
          title={isVoiceoverEnabled ? 'Disable Voiceover' : 'Enable Voiceover'}
        >
          {isVoiceoverEnabled ? (
            <span style={{ fontSize }}>🎙️</span>
          ) : (
            <span style={{ fontSize, opacity: 0.5 }}>🎙️</span>
          )}
        </button>

        <AnimatePresence>
          {hoveredControl === 'voiceover' && isVoiceoverEnabled && (
            <motion.input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={voiceoverVolume}
              onChange={(e) => onVoiceoverVolumeChange(parseFloat(e.target.value))}
              className="volume-slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${voiceoverVolume * 100}%, rgba(255, 255, 255, 0.3) ${voiceoverVolume * 100}%, rgba(255, 255, 255, 0.3) 100%)`
              }}
              title="Voiceover Volume"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: sliderWidth, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}