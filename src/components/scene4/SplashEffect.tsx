import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface SplashEffectProps {
  isVisible: boolean
  particleCount?: number
  position?: { left: string; top: string }
}

export const SplashEffect = ({
  isVisible,
  particleCount = 12,
  position
}: SplashEffectProps) => {
  const { isMobile } = useResponsive()

  const defaultPosition = {
    left: isMobile ? "15%" : "25%",
    top: "50%"
  }

  const pos = position || defaultPosition

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {[...Array(particleCount)].map((_, i) => (
            <motion.div 
              key={`splash-${i}`} 
              className="absolute rounded-full bg-cyan-300/60 z-50"
              style={{ 
                left: pos.left, 
                top: pos.top, 
                width: `${8 + Math.random() * 15}px`, 
                height: `${8 + Math.random() * 15}px` 
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                x: (Math.random() - 0.5) * 200, 
                y: -100 - Math.random() * 150, 
                scale: [0, 1.5, 0], 
                opacity: [1, 0.8, 0] 
              }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.05, 
                ease: "easeOut" 
              }} 
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}