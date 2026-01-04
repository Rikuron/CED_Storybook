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
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-yellow-400 font-canva-sans-bold text-2xl md:text-3xl uppercase mb-3">
          {title}
        </h2>
        <p className="text-white text-lg md:text-xl font-canva-sans-regular italic">
          "{question}"
        </p>
      </motion.div>

      {/* Next Part Button - Bottom Right */}
      <motion.button
        className="absolute bottom-8 right-8 z-40 flex items-center gap-3 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 transition-colors rounded-lg cursor-pointer"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        onClick={onNext}
      >
        <span className="text-black font-canva-sans-bold text-lg">Next Part</span>
        <span className="text-black text-2xl">→</span>
      </motion.button>
    </>
  )
}