import { motion } from "framer-motion"
import { useResponsive } from "../../hooks/useResponsive"

interface FunfactPopupProps {
  text: string
  delay?: number
}

export const FunfactPopup = ({ text, delay = 0 }: FunfactPopupProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const fontSize = isMobile ? '0.875rem' : isTablet ? '1rem' : isTV ? '5.5rem' : '1.2rem'

  return (
    <motion.div
      className={`absolute ${isTV ? 'bottom-1/12 max-w-3/5' : 'bottom-8 max-w-2/5'} z-40`}
      style={{ left: isMobile ? '1rem' : isTablet ? '2rem' : isTV ? '8rem' : '2rem' }}
      initial={{ scale: 0, opacity:  0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        delay, 
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
    >
      <div
        className={`bg-[#345e7d] backdrop-blur-sm ${isTV ? 'rounded-[4.5rem]' : 'rounded-2xl'} border border-slate-600/50`}
        style={{ 
          padding: isTV ? '2rem 4rem' : '0.5rem 1rem', 
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' 
        }}
      >
        <p 
          className={`text-white text-center font-canva-sans-regular leading-relaxed`}
          style={{ fontSize }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  )
}