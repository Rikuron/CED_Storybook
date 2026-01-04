import { motion } from "framer-motion"
import { TypeWriter } from "./TypeWriter"

interface NarrationDialogueProps {
  text: string
  delay?: number
  speed?: number
  onComplete?: () => void
  className?: string
}

export const NarrationDialogue = ({
  text,
  delay = 500,
  speed = 25,
  onComplete,
  className = ""
}: NarrationDialogueProps) => {
  return (
    <motion.div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl ${className}`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <p 
        className="text-lg md:text-xl lg:text-2xl text-center"
        style={{ WebkitTextStroke: '1px #000' }}
      >
        <TypeWriter
          text={text}
          delay={delay}
          speed={speed}
          className="text-white font-canva-sans-bold"
          onComplete={onComplete}
        />
      </p>
    </motion.div>
  )
}