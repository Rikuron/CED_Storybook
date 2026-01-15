import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface SpeciesNameProps {
  isVisible: boolean
  name: string
  typeSpeed?: number
  deleteSpeed?: number
}

export const SpeciesName = ({
  isVisible,
  name,
  typeSpeed = 50,
  deleteSpeed = 30
}: SpeciesNameProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()
  const [displayedText, setDisplayedText] = useState('')
  const [targetName, setTargetName] = useState(name)
  const [phase, setPhase] = useState<'typing' | 'deleting' | 'idle'>('typing')

  const fontSize = isMobile ? 'text-xl' : isTablet ? 'text-5xl' : isTV ? 'text-[12rem]' : 'text-6xl'
  const textStroke = isMobile ? '1px' : isTablet ? '1.5px' : isTV ? '6px' : '2.5px'

  // Handle name prop changes
  useEffect(() => {
    if (name !== targetName) {
      // New name received, start deleting current text
      if (displayedText.length > 0) {
        setPhase('deleting')
      } else {
        // Nothing to delete, just start typing new name
        setTargetName(name)
        setPhase('typing')
      }
    }
  }, [name, targetName, displayedText.length])

  // Handle delete phase
  useEffect(() => {
    if (!isVisible || phase !== 'deleting') return
    if (displayedText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1))
      }, deleteSpeed)
      return () => clearTimeout(timeout)
    } else {
      // Finished deleting, update target and start typing
      setTargetName(name)
      setPhase('typing')
    }
  }, [isVisible, phase, displayedText, deleteSpeed, name])

  // Handle typing phase
  useEffect(() => {
    if (!isVisible || phase !== 'typing') return
    if (displayedText.length < targetName.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(targetName.slice(0, displayedText.length + 1))
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else {
      // Finished typing
      setPhase('idle')
    }
  }, [isVisible, phase, displayedText, targetName, typeSpeed])

  // Reset when becoming visible
  useEffect(() => {
    if (isVisible) {
      setDisplayedText('')
      setTargetName(name)
      setPhase('typing')
    }
  }, [isVisible])
  const showCursor = isVisible && phase !== 'idle'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute z-40 pointer-events-none"
          style={{
            top: '11vh',
            left: '6vw'
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            className={`font-helvetica-blk ${fontSize} text-white`}
            style={{
              WebkitTextStroke: `${textStroke} #000`
            }}
          >
            {displayedText}
            {showCursor && (
              <span className="animate-pulse">|</span>
            )}
          </h2>
        </motion.div>
      )}
    </AnimatePresence>
  )
}