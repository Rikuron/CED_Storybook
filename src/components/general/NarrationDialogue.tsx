import { motion } from "framer-motion"
import { TypeWriter } from "./TypeWriter"
import { useResponsive } from "../../hooks/useResponsive"

interface NarrationDialogueProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
}

export const NarrationDialogue = ({
  text,
  delay = 500,
  speed = 25,
  onComplete,
  className = ""
}: NarrationDialogueProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const textStroke = isMobile ? '0.4px #000' : isTablet ? '0.25px #000' : isTV ? '1.5px #000' : '0.8px #000'
  const fontSize = isMobile ? '0.875rem' : isTablet ? '1rem' : isTV ? '5.5rem' : '1.5rem'

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
          className="text-white font-canva-sans-bold"
          onComplete={onComplete}
        />
      </p>
    </motion.div>
  )
}