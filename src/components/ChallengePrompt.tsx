import { motion } from "framer-motion"
import { useResponsive } from "../hooks/useResponsive"

interface ChallengePromptProps {
  title: string
  question: string
  onNext: () => void
}

export const ChallengePrompt = ({ title, question, onNext }: ChallengePromptProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const titleSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : isTV ? 'text-[9rem]' : 'text-4xl'
  const questionSize = isMobile ? 'text-sm' : isTablet ? 'text-base max-w-xs' : isTV ? 'text-[5rem] max-w-7xl' : 'text-xl'
  const buttonSize = isMobile ? 'text-sm' : isTablet ? 'text-base' : isTV ? 'text-[5rem]' : 'text-lg'
  const arrowSize = isMobile ? 'w-10 h-10' : isTablet ? 'w-12 h-12' : isTV ? 'w-[14rem] h-[14rem]' : 'w-16 h-16'
  const containerPadding = isMobile ? '0.3rem 0.6rem' : isTablet ? '0.4rem 0.8rem' : isTV ? '3rem 6rem' : '0.5rem 1rem'
  const textStroke = isMobile ? '0.5px #000' : isTablet ? '0.75px #000' : isTV ? '6px #000' : '1px #000'

  return (
    <>
      {/* Challenge Text - Bottom Left */}
      <motion.div
        className={`absolute z-40 ${isMobile ? 'bottom-4 left-4' : isTablet ? 'bottom-6 left-6' : isTV ? 'bottom-32 left-32' : 'bottom-8 left-8'}`}
        initial={{ x: -100, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 
          className={`text-yellow-400 font-canva-sans-bold ${titleSize} uppercase`}
          style={{ WebkitTextStroke: textStroke }}
        >
          {title}
        </h2>
        <p className={`text-white ${questionSize} font-canva-sans-regular`}>
          {question}
        </p>
      </motion.div>

      {/* Next Part Button - Bottom Right */}
      <motion.button
        className={`absolute z-60 flex items-center gap-3 cursor-pointer ${isTV ? 'rounded-[5rem]' : 'rounded-2xl'} bg-white/2.5 backdrop-blur-sm border border-transparent hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 ${isMobile ? 'bottom-4 right-4' : isTablet ? 'bottom-6 right-6' : isTV ? 'bottom-16 right-16' : 'bottom-8 right-8'}`}
        style={{ padding: containerPadding }}
        animate={{ x: [0, -30, 0], opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.3, repeat: Infinity }}
        onClick={onNext}
      >
        <span className={`text-white font-nexa ${buttonSize}`}>Next Part</span>
        <img 
          src="Initial Assets/right_arrow.png" 
          alt="next part arrow" 
          className={arrowSize}
        />
      </motion.button>
    </>
  )
}