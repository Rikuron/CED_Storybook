import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface HumanProps {
  isVisible: boolean
  imageSrc?: string
}

export const Human = ({
  isVisible,
  imageSrc = '/Initial Assets/12.1_Australopithecus.png'
}: HumanProps) => {
  const { isMobile, isTV } = useResponsive()

  const humanSize = isMobile ? '30vw' : isTV ? '18vw' : '18vw'
  const humanRight = isMobile ? '10vw' : isTV ? '24vw' : '24vw'
  const humanBottom = isMobile ? '5vh' : isTV ? '18vh' : '18vh'
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute z-25"
          style={{
            right: humanRight,
            bottom: humanBottom
          }}
          initial={{ x: '100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100vw', opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={imageSrc}
              src={imageSrc}
              alt="Early Human"
              style={{
                width: humanSize,
                height: 'auto',
                objectFit: 'contain'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}