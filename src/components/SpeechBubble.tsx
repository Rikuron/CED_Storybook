import { motion } from "framer-motion"
import { TypeWriter } from "./TypeWriter"

interface SpeechBubbleProps {
  text: string
  position?: {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  delay?: number
  speed?: number
  tailPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  onComplete?: () => void
  className?: string
  variant?: 'normal' | 'shout' | 'thought'
}

export const SpeechBubble = ({
  text,
  position = { top: '20%', left: '10%' },
  delay = 0,
  speed = 30,
  tailPosition = 'bottom-left',
  onComplete,
  className = "",
  variant = 'normal'
}: SpeechBubbleProps) => {
  
  const variantStyles = {
    normal: {
      bg: 'white',
      border: 'black',
      text: 'text-black font-canva-sans-bold'
    },
    shout: {
      bg: '#fde047',
      border: 'black',
      text: 'text-black font-canva-sans-bold uppercase'
    },
    thought: {
      bg: 'white',
      border: '#9ca3af',
      text: 'text-gray-700 font-canva-sans-regular italic'
    }
  }

  const currentStyle = variantStyles[variant]

  return (
    <motion.div
      className={`absolute z-30 ${className}`}
      style={position}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        duration: 0.4, 
        ease: "backOut",
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
    >
      {/* Speech Bubble with SVG tail */}
      <div className="relative">
        {/* Main bubble */}
        <motion.div 
          className={`relative rounded-2xl ${currentStyle.text}`}
          whileHover={{ scale: 1.02 }}
          style={{
            backgroundColor: currentStyle.bg,
            border: `3px solid ${currentStyle.border}`,
            boxShadow: `4px 4px 0px 0px rgba(0,0,0,0.3)`,
            padding: '0.5rem 0.75rem'
          }}
        >
          <p className={`text-sm md:text-lg text-center leading-tight`}>
            <TypeWriter 
              text={text}
              delay={delay}
              speed={speed}
              className={currentStyle.text}
              onComplete={onComplete}
            />
          </p>
        </motion.div>

        {/* Curved tail using SVG */}
        {variant !== 'thought' && (
          <svg
            className={`absolute ${
              tailPosition === 'bottom-left' ? 'bottom-[-25px] left-[10%]' :
              tailPosition === 'bottom-right' ? 'bottom-[-25px] right-[10%] scale-x-[-1]' :
              tailPosition === 'top-left' ? 'top-[-25px] left-[10%] scale-y-[-1]' :
              'top-[-25px] right-[10%] scale-[-1]'
            }`}
            width="40"
            height="30"
            viewBox="0 0 40 30"
          >
            {/* Shadow/border */}
            <path
              d="M 5 0 Q 5 25 0 30 Q 20 25 35 0"
              fill="none"
              stroke="black"
              strokeWidth="6"
            />
            {/* Fill */}
            <path
              d="M 5 0 Q 5 25 0 30 Q 20 25 35 0"
              fill={currentStyle.bg}
              stroke={currentStyle.bg}
              strokeWidth="1"
            />
          </svg>
        )}

        {/* Thought bubble dots */}
        {variant === 'thought' && (
          <>
            <div className={`absolute ${tailPosition.includes('bottom') ? 'bottom-[-12px]' : 'top-[-12px]'} ${tailPosition.includes('left') ? 'left-[15%]' : 'right-[15%]'} w-4 h-4 bg-white border-2 border-gray-400 rounded-full`} />
            <div className={`absolute ${tailPosition.includes('bottom') ? 'bottom-[-24px]' : 'top-[-24px]'} ${tailPosition.includes('left') ? 'left-[10%]' : 'right-[10%]'} w-2.5 h-2.5 bg-white border-2 border-gray-400 rounded-full`} />
          </>
        )}
      </div>
    </motion.div>
  )
}