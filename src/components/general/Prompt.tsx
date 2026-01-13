import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '../../hooks/useResponsive'

interface PromptProps {
  title: string
  subtitle?: string
  titleColor?: string
  isVisible?: boolean
}

export const Prompt = ({
  title,
  subtitle,
  titleColor = '#FACC15',
  isVisible = true
}: PromptProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const titleSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : isTV ? 'text-[10rem]' : 'text-[2.5rem]'
  const subtitleSize = isMobile ? 'text-sm max-w-[58.33vw]' : isTablet ? 'text-base max-w-[58.33vw]' : isTV ? 'text-[5rem] max-w-[65vw]' : 'text-[1.5rem] max-w-[58.33vw]'
  const titleStroke = isMobile ? '1px #000' : isTablet ? '1.5px #000' : isTV ? '9px #000' : '2px #000'
  const subtitleStroke = isMobile ? '0.5px #000' : isTablet ? '0.8px #000' : isTV ? '3.5px #000' : '0.8px #000'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute z-40"
          style={{
            top: '72%',
            left: isMobile ? '1rem' : isTablet ? '1.5rem' : isTV ? '8rem' : '2rem'
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 
            className={`font-canva-sans-bold ${titleSize} uppercase`}
            style={{ 
              color: titleColor,
              WebkitTextStroke: titleStroke
            }}
          >
            {title}
          </h2>
          <p 
            className={`text-white ${subtitleSize} font-helvetica-blk`}
            style={{
              WebkitTextStroke: subtitleStroke
            }}
          >
            {subtitle}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}