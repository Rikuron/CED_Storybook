import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { TypeWriter } from "./TypeWriter"
import { useNarratorVoiceover } from "../../hooks/useNarratorVoiceover"
import { useResponsive } from "../../hooks/useResponsive"

interface NarrationDialogueProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
  voiceoverSrc?: string
}

export const NarrationDialogue = ({
  text,
  delay = 500,
  speed = 25,
  onComplete,
  className = "",
  voiceoverSrc,
}: NarrationDialogueProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()
  const { play, isEnabled } = useNarratorVoiceover()

  const [typingComplete, setTypingComplete] = useState(false)
  const [audioComplete, setAudioComplete] = useState(!voiceoverSrc)
  const hasCalledComplete = useRef(false)

  const textStroke = isMobile ? '0.4px #000' : isTablet ? '0.25px #000' : isTV ? '4px #000' : '0.8px #000'
  const fontSize = isMobile ? '0.875rem' : isTablet ? '1rem' : isTV ? '5.5rem' : '1.5rem'

  // Play voiceover when component mounts (after delay)
  useEffect(() => {
    if (voiceoverSrc && isEnabled) {
      const timer = setTimeout(() => play(voiceoverSrc, () => setAudioComplete(true)), delay)

      return () => clearTimeout(timer)
    }
  }, [voiceoverSrc, play, delay, isEnabled])

  // Call onComplete when BOTH typing and audio are done
  useEffect(() => {
    if (typingComplete && audioComplete && !hasCalledComplete.current) {
      hasCalledComplete.current = true
      onComplete?.()
    }
  }, [typingComplete, audioComplete, onComplete])

  return (
    <motion.div
      className={`absolute bottom-1/12 left-1/2 -translate-x-1/2 z-40 w-[90%] ${className}`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <p 
        className='text-center'
        style={{ 
          WebkitTextStroke: textStroke,
          fontSize: fontSize
        }}
      >
        <TypeWriter
          text={text}
          delay={delay}
          speed={speed}
          className="text-white font-helvetica-blk"
          onComplete={() => setTypingComplete(true)}
        />
      </p>
    </motion.div>
  )
}