import { motion } from "framer-motion"

interface FunfactPopupProps {
  text: string
  delay?: number
}

export const FunfactPopup = ({ text, delay = 0 }: FunfactPopupProps) => {
  return (
    <motion.div
      className="absolute bottom-8 left-8 z-40"
      initial={{ scale: 0, opacity:  0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        delay, 
        type: "spring",
        stiffness: 400,
        damping: 15
      }}
    >
      <div
        className="bg-[#345e7d] backdrop-blur-sm rounded-2xl border border-slate-600/50"
        style={{ padding: '0.5rem 1rem ', boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
      >
        <p className="text-white text-base md:text-lg font-canva-sans-regular leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  )
}