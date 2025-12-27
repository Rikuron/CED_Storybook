import { motion } from "framer-motion"

interface HeroProps {
  x?: number | string
  y?: number | string
  scale?: number | string
  animate?: any
  transition?: any
  shake?: boolean
}

export const Hero =({
  x = "50%",
  y = "50%",
  scale = 1,
  animate,
  transition,
  shake = false
}: HeroProps) => {
  
  const defaultAnimate = {
    x,
    y,
    scale,
    rotate: shake ? [0, -2, 2, -2, 2, 0] : 0
  }

  const defaultTransition = shake
    ? {
        x: { type: "spring", stiffness: 50, damping: 20 },
        y: { type: "spring", stiffness: 50, damping: 20 },
        scale: { type: "spring", stiffness: 50, damping: 20 },
        rotate: { 
          duration: 0.5, 
          repeat: 3,
          ease: "easeInOut" 
        }
      }
    : {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1.5
      }

  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{ left: 0, top: 0 }}
      initial={{ x: "-20%", y, scale: 0.8, opacity: 0 }}
      animate={animate || defaultAnimate}
      transition={ transition || defaultTransition }
    >
      <motion.img
        src="/Initial Assets/diego.png"
        alt="Diego the UFO"
        className="w-32 h-32 object-contain drop-shadow-2xl"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}