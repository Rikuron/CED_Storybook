import { motion, AnimatePresence } from "framer-motion"
import { useResponsive } from "../hooks/useResponsive"

interface PartIntroductionProps {
  title: string
  highlightWord: string
  isVisible: boolean
  onComplete?: () => void
}

export const PartIntroduction = ({
  title,
  highlightWord,
  isVisible,
  onComplete
}: PartIntroductionProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const parts = title.split(highlightWord)
  const titleSize = isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : isTV ? 'text-[10rem]' : 'text-6xl'
  const textStroke = isMobile ? '1px' : isTablet ? '1.5px' : isTV ? '4px' : '2px'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 z-50 flex items-end pointer-events-none"
          style={{ padding: isMobile ? '2rem' : isTablet ? '3rem' : isTV ? '8rem' : '4rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={(definition) => {
            if (definition === 'exit' && onComplete) onComplete()
          }}
        >
          {/* Main Title */}
          <motion.h1
            className={`font-canva-sans-bold ${titleSize} uppercase leading-tight`}
            style={{ WebkitTextStroke: `${textStroke} #000` }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {parts[0] && <span className="text-white">{parts[0]}</span>}
            <span className="text-orange-400">{highlightWord}</span>
            {parts[1] && <span className="text-white">{parts[1]}</span>}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}