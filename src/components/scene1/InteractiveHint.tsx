import { motion, AnimatePresence } from "framer-motion"
import { useResponsive } from "../../hooks/useResponsive"

interface InteractiveHintProps {
  text: string
  isVisible: boolean
  delay?: number
  position? : {
    top?: string
    left?: string
    transform?: string
  }
}

export const InteractiveHint = ({
  text,
  isVisible,
  delay = 5,
  position = {
    top: '27.5%',
    left: '45%',
    transform: 'translate(-45%, -50%)'    
  }
}: InteractiveHintProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()
  
  const fontSize = isMobile ? 'text-sm' : isTablet ? 'text-4xl' : isTV ? 'text-[12rem]' : 'text-5xl'
  const textStroke = isMobile ? '0.5px' : isTablet ? '1px' : isTV ? '4px' : '1.5px'
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute pointer-events-none"
          style={position}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, delay: 0 }
          }}
          transition={{ 
            delay, duration: 0.5 
          }}
        >
          <motion.span
            className={`text-yellow-300 ${fontSize} font-canva-sans-bold text-center`}
            style={{ 
              WebkitTextStroke: `${textStroke} #000000`,
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {text}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}