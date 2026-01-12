import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface QuestionMarkButtonProps {
  isVisible: boolean
  onClick: () => void
}

export const QuestionMarkButton = ({ 
  isVisible, 
  onClick 
}: QuestionMarkButtonProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const size = isMobile ? '50px' : isTablet ? '70px' : isTV ? '200px' : '90px'
  const glowBlur = isMobile ? '15px' : isTablet ? '20px' : isTV ? '60px' : '25px'
  const bottom = isMobile ? '15%' : isTablet ? '18%' : isTV ? '20%' : '10%'
  const left = isMobile ? '10%' : isTablet ? '12%' : isTV ? '8%' : '7.5%'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute z-50 cursor-pointer"
          style={{ bottom, left }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400/40"
            style={{
              filter: `blur(${glowBlur})`,
              transform: 'scale(1.8)'
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Question mark image */}
          <motion.img
            src="/Initial Assets/question_mark.png"
            alt="Question"
            style={{ width: size, height: 'auto' }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}