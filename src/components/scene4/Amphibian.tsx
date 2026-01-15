import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface AmphibianProps {
  isVisible: boolean
  isClickable: boolean
  onMoveComplete?: () => void
  onClick?: () => void
}

export const Amphibian = ({
  isVisible,
  isClickable,
  onMoveComplete,
  onClick
}: AmphibianProps) => {
  const [isMoving, setIsMoving] = useState(false)
  const [footprints, setFootprints] = useState<{ 
    id: number; 
    x: number;
    y: number;
  }[]>([])
  const { isMobile, isTablet, isTV } = useResponsive()

  const amphibianSize = isMobile ? '25vw' : isTablet ? '30vw' : isTV ? '35vw' : '28vw'
  const footprintSize = isMobile ? '2vw' : isTablet ? '2.5vw' : isTV ? '3vw' : '2.5vw'
  
  const handleClick = () => {
    if (!isClickable || isMoving) return

    setIsMoving(true)
    onClick?.()

    // Create footprints
    const footprintInterval = setInterval(() => {
      setFootprints(prev => [
        ...prev,
        {
          id: Date.now(),
          x: 45 + prev.length * 6,
          y: 55 + (prev.length % 2 === 0 ? -2 : 2),
        }
      ])
    }, 5000)

    // Stop after moving offscreen
    setTimeout(() => {
      clearInterval(footprintInterval)
      onMoveComplete?.()
    }, 14000)
  }

  return (
    <>
      {/* Footprints */}
      {footprints.map((fp, index) => (
        <motion.img
          key={fp.id}
          src="/initial_assets/brown_oval.png"
          alt="Footprint"
          className="absolute pointer-events-none"
          style={{
            width: footprintSize,
            left: `${fp.x}%`,
            top: `${fp.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        />
      ))}
      
      {/* Amphibian (Tiktaalik) */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute ${isClickable && !isMoving ? 'cursor-pointer' : ''}`}
            style={{
              width: amphibianSize,
              bottom: isMobile ? '30%' : '35%',
              left: '40%',
              zIndex: 25
            }}
            initial={{ 
              y: 50,
              opacity: 0,
              scale: 0.9  
            }}
            animate={isMoving 
              ? { x: '80vw', y: 0, opacity: 1, scale: 1 }
              : { y: 0, opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0 }}
            transition={isMoving 
              ? { duration: 10, ease: 'linear' }
              : { duration: 1.2, ease: 'easeOut' }
            }
            onClick={handleClick}
            whileHover={isClickable && !isMoving ? { scale: 1.05 } : undefined}
          >
            {/* Glow effect */}
            {isClickable && !isMoving && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  filter: 'blur(20px)',
                  background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
                  transform: 'scale(1.3)'
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <img
              src="/initial_assets/5_Tiktaalik.png"
              alt="Tiktaalik - Early amphibian"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}