import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface FootprintsProps {
  isVisible: boolean
  isClickable: boolean
  onClick: () => void
}

export const Footprints = ({
  isVisible,
  isClickable,
  onClick
}: FootprintsProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const footprintSize = isMobile ? '3vw' : isTablet ? '3.5vw' : isTV ? '4vw' : '3vw'
  
  // Footprint positions (diagonal trail)
  const positions = [
    { x: 55, y: 58 },
    { x: 62, y: 54 },
    { x: 69, y: 57 },
    { x: 76, y: 53 },
    { x: 83, y: 56 },
    { x: 90, y: 52 },
    { x: 97, y: 55 },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {positions.map((pos, index) => (
            <motion.div
              key={index}
              className={`absolute z-25 ${isClickable ? 'cursor-pointer' : ''}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: footprintSize,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 1.0 }}
              onClick={isClickable ? onClick : undefined}
              whileHover={isClickable ? { scale: 1.3 } : undefined}
            >
              {/* Glow effect when clickable */}
              {isClickable && (
                <motion.div 
                  className="absolute rounded-full"
                  style={{
                    width: '200%',
                    height: '200%',
                    left: '-50%',
                    top: '-50%',
                    filter: 'blur(10px)',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 60%)',
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.1 }}
                />
              )}
              <img 
                src="/Initial Assets/brown_oval.png"
                alt="Footprint"
                className="w-full h-auto relative z-10"
              />
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  )
}