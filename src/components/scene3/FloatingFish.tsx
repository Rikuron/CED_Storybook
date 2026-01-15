import { motion, AnimatePresence } from "framer-motion"
import { useResponsive } from "../../hooks/useResponsive"

interface FloatingFishProps {
  isVisible: boolean
  highlightedFishIndex?: number | null
  onFishClick?: (index: number) => void
  exitLeft?: boolean
}

const fishPositions = [
  { top: '15%', xEnd: 0.9 },
  { top: '25%', xEnd: 0.7 },
  { top: '25%', xEnd: 0.25}, // Highlighted Fish
  { top: '35%', xEnd: 0.5 },
  { top: '45%', xEnd: 0.85 },
  { top: '55%', xEnd: 0.4 },
  { top: '65%', xEnd: 0.2 },
  { top: '75%', xEnd: 0.95 },
  { top: '85%', xEnd: 0.65 },
]

export const FloatingFish = ({ 
  isVisible,
  highlightedFishIndex,
  onFishClick,
  exitLeft = false
}: FloatingFishProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const baseFishSize = isMobile ? 40 : isTablet ? 55 : isTV ? 210 : 70
  const fishSizeVariation = isMobile ? 10 : isTablet ? 15 : isTV ? 65 : 20
  const questionMarkSize = isMobile ? '20px' : isTablet ? '25px' : isTV ? '150px' : '30px'
  const glowBlur = isMobile ? '10px' : isTablet ? '15px' : isTV ? '75px' : '20px'

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {fishPositions.map((fish, i) => {
            const isHighlighted = highlightedFishIndex === i

            return (
              <motion.div
                key={`fish-${i}`}
                className={`absolute z-30 ${isHighlighted ? 'cursor-pointer' : ''}`}
                style={{
                  top: fish.top,
                  right: '-150px'
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: exitLeft 
                    ? -window.innerWidth - 200
                    : [0, -window.innerWidth * fish.xEnd],
                  y: [0, -15, 0, 15, 0],
                  opacity: exitLeft ? [1, 0] : [0, 1, 1],
                  scale: isHighlighted ? 1.25 : 1
                }}
                transition={{
                  x: {
                    duration: exitLeft ? 1.5 : 2 + (i % 3) * 0.5,
                    delay: exitLeft? i * 0.1 : i * 0.3,
                    ease: "easeInOut"
                  },
                  y: {
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeOut"
                  },
                  opacity: {
                    duration: 2,
                    delay: i * 0.3
                  },
                  scale: {
                    duration: 0.5
                  }
                }}
                onClick={() => isHighlighted && onFishClick?.(i)}
              >
                {/* Glow effect for highlighted fish */}
                {isHighlighted && (
                  <motion.div  
                    className="absolute inset-0 rounded-full bg-yellow-400/30"
                    style={{
                      filter: `blur(${glowBlur})`,
                      transform: 'scale(1.5)'
                    }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                <img 
                  src={i % 2 === 0 ? "/initial_assets/fish_1.png" : "/initial_assets/fish_2.png"} 
                  alt="fish"
                  style={{ width: `${baseFishSize + (i % 3) * fishSizeVariation}px` }}
                />

                {/* Question Mark for highlighted fish */}
                {isHighlighted && (
                  <motion.img  
                    src="/initial_assets/question_mark.png"
                    alt="?"
                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                    style={{ width: questionMarkSize }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            )
          })}
        </>
      )}
    </AnimatePresence>
  )
}