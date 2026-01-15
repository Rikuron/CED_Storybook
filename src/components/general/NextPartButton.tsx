import { motion } from "framer-motion"
import { useResponsive } from "../../hooks/useResponsive"

interface NextPartButtonProps {
  onClick: () => void
  isVisible?: boolean
  arrowSize?: string
  buttonTextSize?: string
  padding?: string
}

export const NextPartButton = ({ 
  onClick, 
  isVisible = true,
  arrowSize,
  buttonTextSize,
  padding
}: NextPartButtonProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const finalButtonSize = buttonTextSize ?? (isMobile ? 'text-sm' : isTablet ? 'text-base' : isTV ? 'text-[5rem]' : 'text-lg')
  const finalArrowSize = arrowSize ?? (isMobile ? 'w-10 h-10' : isTablet ? 'w-12 h-12' : isTV ? 'w-[14rem] h-[14rem]' : 'w-16 h-16')
  const finalPadding = padding ?? (isMobile ? '0.3rem 0.6rem' : isTablet ? '0.4rem 0.8rem' : isTV ? '3rem 6rem' : '0.5rem 1rem')

  if (!isVisible) return null

  return (
    <motion.button
      className={`absolute z-60 flex items-center cursor-pointer ${isTV ? 'rounded-[5rem] gap-12' : 'rounded-2xl gap-3'} bg-white/2.5 backdrop-blur-sm border border-transparent hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 ${isMobile ? 'bottom-4 right-4' : isTablet ? 'bottom-6 right-6' : isTV ? 'bottom-16 right-16' : 'bottom-8 right-8'}`}
      style={{ padding: finalPadding }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.5 }}
      whileInView={{ x: [0, -10, 0] }}
      onClick={onClick}
    >
      <span className={`text-white font-nexa ${finalButtonSize}`}>Next Part</span>
      <img 
        src="/initial_assets/right_arrow.png" 
        alt="next part arrow" 
        className={finalArrowSize}
      />
    </motion.button>
  )
}