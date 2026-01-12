import { motion, AnimatePresence } from 'framer-motion'

interface WindGustsProps {
  isVisible: boolean
}

export const WindGusts = ({
  isVisible
}: WindGustsProps) => {
  const gusts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 60}%`,
    delay: Math.random() * 0.5,
    duration: 0.4 + Math.random() * 0.3,
    width: 40 + Math.random() * 60,
    opacity: 0.3 + Math.random() * 0.4
  }))

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {gusts.map((gust) => (
            <motion.div 
              key={gust.id}
              className="absolute h-[2px] rounded-full"
              style={{
                top: gust.top,
                width: gust.width,
                background: 'linear-gradient(to left, rgba(255,255,255,0.8), transparent)',
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
