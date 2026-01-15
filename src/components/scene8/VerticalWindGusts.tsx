import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface VerticalWindGustsProps {
  isVisible: boolean
}

export const VerticalWindGusts = ({ isVisible }: VerticalWindGustsProps) => {
  const { isMobile, isTV } = useResponsive()

  const gusts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    delay: Math.random() * 0.5,
    duration: 0.6 + Math.random() * 0.4,
    width: isMobile ? 4 : isTV ? 15 : 5,
    height: isMobile ? 40 : isTV ? 200 : 80,
    opacity: 0.5 + Math.random() * 0.4
  }))

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {gusts.map((gust) => (
            <motion.div 
              key={gust.id}
              className="absolute rounded-full"
              style={{
                left: gust.left,
                width: gust.width,
                height: gust.height,
                background: 'linear-gradient(to top, rgba(200,200,200,0.9), transparent)',
                bottom: '-100px'
              }}
              initial={{
                y: 0,
                opacity: 0
              }}
              animate={{
                y: [0, -window.innerHeight - 200],
                opacity: [0, gust.opacity, gust.opacity, 0]
              }}
              transition={{
                duration: gust.duration,
                delay: gust.delay,
                repeat: Infinity,
                repeatDelay: 0.2 + Math.random() * 0.3,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}