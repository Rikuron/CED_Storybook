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
          className="absolute bottom-0 left-0 right-0 z-15"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Land Image */}
          <img
            src="/initial_assets/scene5_land.png"
            alt="Prehistoric land"
            className="w-full h-auto"
          />

          {/* Smaller Dinosaur (left side) */}
          <motion.img
            src="/initial_assets/7_SmallDinosaur.png"
            alt="Small dinosaur"
            className={`absolute object-contain ${isInteractive ? 'cursor-pointer' : ''}`}
            style={{
              bottom: isMobile ? '10%' : isTablet ? '12%' : isTV ? '15%' : '12%',
              left: isMobile ? '2%' : '5%',
              height: isMobile ? '20%' : isTablet ? '30%' : isTV ? '35%' : '32%',
              pointerEvents: isInteractive ? 'auto' : 'none'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
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
              bottom: isMobile ? '5%' : isTablet ? '8%' : isTV ? '10%' : '8%',
              right: isMobile ? '2%' : '8%',
              height: isMobile ? '30%' : isTablet ? '50%' : isTV ? '65%' : '60%',
              pointerEvents: isInteractive ? 'auto' : 'none'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
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