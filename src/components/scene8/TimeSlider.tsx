import { motion } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface TimeSliderProps {
  isVisible: boolean
  currentPosition?: number 
}

export const TimeSlider = ({
  isVisible,
  currentPosition = 0
}: TimeSliderProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const sliderHeight = isMobile ? '4vh' : isTablet ? '5vh' : isTV ? '8vh' : '5vh'
  const circleSize = isMobile ? '8vw' : isTablet ? '6vw' : isTV ? '8vw' : '5vw'
  const bottomOffset = isMobile ? '5vh' : isTablet ? '6vh' : isTV ? '8vh' : '6vh'

  if (!isVisible) return null

  return (
    <motion.div
      className="absolute z-35"
      style={{
        left: '5vw',
        right: '5vw',
        bottom: bottomOffset
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Slider Track */}
      <div
        className="relative rounded-full bg-white w-full"
        style={{
          height: sliderHeight,
          boxShadow: '4px 4px 0px rgba(0,0,0,0.2)'
        }}
      >
        {/* Circle/Knob */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: circleSize,
            height: circleSize,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#4A3728', // Brown color
            boxShadow: '2px 2px 8px rgba(0,0,0,0.3)'
          }}
          animate={{
            left: `${currentPosition}%`
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}