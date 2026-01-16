import { motion, AnimatePresence } from 'framer-motion'
import { NextPartButton } from '../../components/general/NextPartButton'
import { useResponsive } from '../../hooks/useResponsive'

interface DinosaurChallengeProps {
  isVisible: boolean
  onNext: () => void
}

export const DinosaurChallenge = ({
  isVisible,
  onNext
}: DinosaurChallengeProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const titleSize = isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : isTV ? 'text-[12rem]' : 'text-5xl'
  const questionSize = isMobile ? 'text-sm' : isTablet ? 'text-lg' : isTV ? 'text-[6rem]' : 'text-2xl'
  const labelSize = isMobile ? 'text-xs' : isTablet ? 'text-sm' : isTV ? 'text-[4rem]' : 'text-base'
  const arrowSize = isMobile ? 'w-8 h-8' : isTablet ? 'w-10 h-10' : isTV ? 'w-[10rem] h-[10rem]' : 'w-14 h-14'
  const buttonArrowSize = isMobile ? 'w-8 h-8' : isTablet ? 'w-10 h-10' : isTV ? 'w-[16rem] h-[16rem]' : 'w-12 h-12'
  const buttonSize = isMobile ? 'text-sm' : isTablet ? 'text-base' : isTV ? 'text-[5rem]' : 'text-lg'
  const textStroke = isMobile ? '1px #000' : isTablet ? '1.5px #000' : isTV ? '8px #000' : '2px #000'
  const questionStroke = isMobile ? '0.5px #000' : isTablet ? '0.5px #000' : isTV ? '5px #000' : '1px #000'
  const containerPadding = isMobile ? '0.3rem 0.6rem' : isTablet ? '0.4rem 0.8rem' : isTV ? '3rem 6rem' : '0.5rem 1rem'

  const smallBodyMove = isMobile ? 5 : isTablet ? 5 : isTV ? 30 : 7.5
  const bigBodyMove = isMobile ? 5 : isTablet ? 8 : isTV ? 25 : 7.5

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Small Body Label (pointing left to smaller dinosaur) */}
          <motion.div
            className={`absolute z-40 flex items-center ${isTV ? 'gap-8' : 'gap-2'}`}
            style={{
              top: isMobile ? '50%' : isTV ? '55%' : '60%',
              left: isMobile ? '25%' : isTV ? '29%' : '33.5%'
            }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: [-smallBodyMove, 0, -smallBodyMove], opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ 
              x: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.5, delay: 0.2 }
            }}
          >
            <img
              src="/initial_assets/left_arrow.png"
              alt="arrow"
              className={arrowSize}
            />
            <span className={`text-white font-canva-sans-bold ${labelSize}`}>Small Body</span>
          </motion.div>

          {/* Big Body Label (pointing right to bigger dinosaur) */}
          <motion.div
            className={`absolute z-40 flex items-center ${isTV ? 'gap-8' : 'gap-2'}`}
            style={{
              top: isMobile ? '50%' : isTV ? '55%' : '60%',
              right: isMobile ? '25%' : isTV ? '37.5%' : '35%'
            }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: [bigBodyMove, 0, bigBodyMove], opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ 
              x: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.5, delay: 0.2 }
            }}
          >
            <span className={`text-white font-canva-sans-bold ${labelSize}`}>Big Body</span>
            <img
              src="/initial_assets/right_arrow.png"
              alt="arrow"
              className={arrowSize}
            />
          </motion.div>

          {/* Question Title and Text (centered at bottom) */}
          <motion.div
            className="absolute z-40 left-1/2 -translate-x-1/2 text-center"
            style={{
              bottom: '5%'
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2
              className={`text-white font-canva-sans-bold ${titleSize}`}
              style={{ WebkitTextStroke: textStroke }}
            >
              Question
            </h2>
            <p 
              className={`text-white ${questionSize} font-helvetica-blk mt-2`}
              style={{ WebkitTextStroke: questionStroke }}  
            >
              Big body vs. small body—Which helped dinosaurs survive?
            </p>
          </motion.div>

          {/* Next Part Button (bottom right) */}
          <NextPartButton 
            onClick={onNext} 
            arrowSize={buttonArrowSize}  
            buttonTextSize={buttonSize}
            padding={containerPadding}
          />
        </>
      )}
    </AnimatePresence>
  )
}