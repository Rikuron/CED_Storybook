import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface WindGustsProps {
  isVisible: boolean
}

export const WindGusts = ({
  isVisible
}: WindGustsProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const gustCount = isMobile ? 12 : isTablet ? 15 : isTV ? 30 : 18
  const gustHeight = isMobile ? '3px' : isTablet ? '4px' : isTV ? '12px' : '4px'
  const baseWidth = isMobile ? 30 : isTablet ? 40 : isTV ? 150 : 40
  const widthVariation = isMobile ? 40 : isTablet ? 60 : isTV ? 200 : 60
  const baseOpacity = isMobile ? 0.5 : isTablet ? 0.5 : isTV ? 0.7 : 0.5
  const opacityVariation = isMobile ? 0.3 : isTablet ? 0.4 : isTV ? 0.3 : 0.4

  const gusts = Array.from({ length: gustCount }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 60}%`,
    delay: Math.random() * 0.5,
    duration: 0.4 + Math.random() * 0.3,
    width: baseWidth + Math.random() * widthVariation,
    height: gustHeight,
    opacity: baseOpacity + Math.random() * opacityVariation
  }))

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {gusts.map((gust) => (
            <motion.div 
              key={gust.id}
              className="absolute rounded-full"
              style={{
                top: gust.top,
                width: gust.width,
                height: gust.height,
                background: 'linear-gradient(to left, rgba(200,200,200,0.9), transparent)',
                right: '-100px'
              }}
              initial={{
                x: 0,
                opacity: 0
              }}
              animate={{
                x: [0, -window.innerWidth - 200],
                opacity: [0, gust.opacity, gust.opacity, 0]
              }}
              transition={{
                duration: gust.duration,
                delay: gust.delay,
                repeat: Infinity,
                repeatDelay: 0.3 + Math.random() * 0.5,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
