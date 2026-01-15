import { motion, AnimatePresence } from 'framer-motion'

interface ExitToSpaceOverlayProps {
  isVisible: boolean
}

export const ExitToSpaceOverlay = ({ isVisible }: ExitToSpaceOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Sky background */}
          <motion.div 
            className="absolute inset-0 z-40 pointer-events-none bg-linear-to-b from-blue-300 via-blue-100 to-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
          
          {/* Cloud layers rushing downward (Diego going up) */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute z-50 pointer-events-none"
              style={{
                width: '200%',
                height: '60%',
                top: `${-50 + i * 20}%`,
                left: '-50%',
                background: 'url("/Initial Assets/clouds.png")',
                backgroundSize: 'cover',
                filter: `blur(${2 + i}px)`,
                opacity: 0.7 - i * 0.1,
              }}
              initial={{ 
                x: i % 2 === 0 ? '-20%' : '20%', 
                y: '-100vh',
                scale: 1 + i * 0.2
              }}
              animate={{ 
                x: i % 2 === 0 ? '20%' : '-20%', 
                y: '100vh',
                scale: 1.5 + i * 0.2
              }}
              transition={{ 
                duration: 2.5 - i * 0.2, 
                delay: 0.8 + i * 0.15,
                ease: "easeIn" 
              }}
            />
          ))}
          
          {/* White flash at the end */}
          <motion.div 
            className="absolute inset-0 z-60 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2, ease: "easeIn" }}
          />
        </>
      )}
    </AnimatePresence>
  )
}