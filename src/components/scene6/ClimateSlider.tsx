import { motion } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

type ClimateLevel = 'initial' | 'cold' | 'middle' | 'hot'

interface ClimateSliderProps {
  isVisible: boolean
  currentLevel: ClimateLevel
}

export const ClimateSlider = ({
  isVisible,
  currentLevel
}: ClimateSliderProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const getCircleColor = () => {
    switch (currentLevel) {
      case 'initial': return '#345E7D'
      case 'cold': return '#6CC9FF'
      case 'hot': return '#DF4E1E'
      case 'middle': return '#B0BE5A'
    }
  }

  const getCirclePosition = () => {
    switch (currentLevel) {
      case 'initial': return '35%'
      case 'cold': return '80%'
      case 'hot': return '10%'
      case 'middle': return '40%'
    }
  }

  const sliderWidth = isMobile ? '6vw' : isTablet ? '5vw' : isTV ? '6vw' : '4vw'
  const circleSize = isMobile ? '12vw' : isTablet ? '10vw' : isTV ? '10vw' : '7vw'

  if (!isVisible) return null

  return (
    <motion.div
      className="absolute z-35"
      style={{
        right: '30vw',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Slider Track */}
      <div
        className="relative rounded-full bg-white"
        style={{
          width: sliderWidth,
          height: '80vh',
          boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
          transform: 'translateY(-50%)'
        }}
      >
        {/* Circle/Knob */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: circleSize,
            height: circleSize,
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.3)'
          }}
          animate={{
            top: getCirclePosition(),
            backgroundColor: getCircleColor()
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}