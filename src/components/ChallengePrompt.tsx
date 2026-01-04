import { motion } from "framer-motion"

interface ChallengePromptProps {
  title: string
  question: string
  onNext: () => void
}

export const ChallengePrompt = ({ title, question, onNext }: ChallengePromptProps) => {
  return (
    <>
      {/* Challenge Text - Bottom Left */}
      <motion.div
        className="absolute bottom-8 left-8 z-40 max-w-md"
        initial={{ x: -100, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 
          className="text-yellow-400 font-canva-sans-bold text-3xl md:text-4xl uppercase mb-6"
          style={{ WebkitTextStroke: '1px #000' }}
        >
          {title}
        </h2>
        <p className="text-white text-lg md:text-xl font-canva-sans-regular">
          {question}
        </p>
      </motion.div>

      {/* Next Part Button - Bottom Right */}
      <motion.button
        className="absolute bottom-8 right-8 z-60 flex items-center gap-3 cursor-pointer rounded-2xl bg-white/2.5 backdrop-blur-sm border border-transparent hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300"
        style={{ padding: '0.5rem 1rem'}}
        animate={{ x: [0, -30, 0], opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.3, repeat: Infinity }}
        onClick={onNext}
      >
        <span className="text-white font-nexa text-lg">Next Part</span>
        <img 
          src="Initial Assets/right_arrow.png" 
          alt="next part arrow" 
          className="w-16 h-16"
        />
      </motion.button>
    </>
  )
}