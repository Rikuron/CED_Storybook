import { motion, AnimatePresence } from 'framer-motion'
import { mammalData, type MammalInfo } from '../../data/mammalInfo'
import { useResponsive } from '../../hooks/useResponsive'

interface MammalProps {
  isVisible: boolean
  isInteractive?: boolean
  onMammalClick?: (mammal: MammalInfo) => void
}

export const Mammal = ({
  isVisible,
  isInteractive = true,
  onMammalClick
}: MammalProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const glowSize = isMobile ? '15px' : isTablet ? '20px' : isTV ? '60px' : '25px'
  const sizeMultiplier = isMobile ? 0.5 : isTablet ? 0.8 : isTV ? 4.0 : 1.0
  
  const handleMammalClick = (mammal: MammalInfo) => {
    if (onMammalClick) onMammalClick(mammal)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {mammalData.map((mammal) => (
            <motion.div
              key={mammal.id}
              className={`absolute ${isInteractive ? 'cursor-pointer' : ''}`}
              style={{ 
                left: mammal.position.x, 
                top: mammal.position.y,
                pointerEvents: isInteractive ? 'auto' : 'none'
              }}
              initial={{ opacity: 0, x: 200 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -10, 0]
              }}
              exit={{ opacity: 0, x: 200 }}
              transition={{
                x: {
                  duration: 1.5,
                  delay: mammal.id * 0.3,
                  ease: "easeOut"
                },
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  delay: mammal.id * 0.3,
                  duration: 0.5
                }
              }}
              whileHover={isInteractive ? { scale: 1.1 } : undefined}
              whileTap={isInteractive ? { scale: 0.95 } : undefined}
              onClick={(e) => {
                e.stopPropagation()
                handleMammalClick(mammal)
              }}
            >
              {/* White Glow Effect */}
              {isInteractive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.9) 10%, transparent 70%)',
                    filter: `blur(${glowSize})`,
                    transform: 'scale(1.3)'
                  }}
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              
              {/* Mammal Image */}
              <img 
                src={mammal.image} 
                alt={mammal.scientific_name}
                style={{ width: mammal.size * sizeMultiplier, height: 'auto' }}
                className="drop-shadow-lg relative z-10"
              />
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  )
}