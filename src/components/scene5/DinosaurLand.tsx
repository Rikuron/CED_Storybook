import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface DinosaurLandProps {
  isVisible: boolean
  isInteractive?: boolean
  onDinosaurClick?: (dinosaur: 'smaller' | 'bigger') => void
}

export const DinosaurLand = ({ 
  isVisible,
  isInteractive,
  onDinosaurClick
}: DinosaurLandProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const handleDinosaurClick = (dinosaur: 'smaller' | 'bigger') => {
    if (onDinosaurClick) onDinosaurClick(dinosaur)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Smaller Dinosaur (left side) */}
          <motion.img
            src="/initial_assets/7_SmallDinosaur.png"
            alt="Small dinosaur"
            className={`absolute object-contain ${isInteractive ? 'cursor-pointer' : ''}`}
            style={{
              bottom: isMobile ? '10vh' : isTablet ? '12vh' : isTV ? '15vh' : '12vh',
              left: isMobile ? '2vw' : isTV ? '8vw' : '15vw',
              height: isMobile ? '20vh' : isTablet ? '30vh' : isTV ? '35vh' : '32vh',
              pointerEvents: isInteractive ? 'auto' : 'none'
            }}
            initial={{ opacity: 1, x: 0 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              filter: isInteractive
                ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))'
                : 'none' 
            }}
            whileHover={isInteractive ? { scale: 1.05 } : undefined}
            whileTap={isInteractive ? { scale: 0.95 } : undefined}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              e.stopPropagation()
              handleDinosaurClick('smaller')
            }}
          />

          {/* Bigger Dinosaur (right side) */}
          <motion.img
            src="/initial_assets/bigger_dinosaur.png"
            alt="Big dinosaur"
            className={`absolute object-contain ${isInteractive ? 'cursor-pointer' : ''}`}
            style={{
              bottom: isMobile ? '5vh' : isTablet ? '8vh' : isTV ? '10vh' : '8vh',
              right: isMobile ? '2vw' : '6vw',
              height: isMobile ? '30vh' : isTablet ? '70vh' : isTV ? '65vh' : '60vh',
              pointerEvents: isInteractive ? 'auto' : 'none'
            }}
            initial={{ opacity: 1, x: 0 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              filter: isInteractive
                ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))'
                : 'none' 
            }}
            whileHover={isInteractive ? { scale: 1.05 } : undefined}
            whileTap={isInteractive ? { scale: 0.95 } : undefined}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              e.stopPropagation()
              handleDinosaurClick('bigger')
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}