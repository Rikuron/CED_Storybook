import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface DialogueBoxProps {
  lines: string[]
  onComplete?: () => void
  speaker?: string
}

export const DialogueBox = ({ lines, onComplete, speaker = "Diego" }: DialogueBoxProps) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const currentLine = lines[currentLineIndex]

  useEffect(() => {
    setDisplayedText("")
    setIsTyping(true)
    let charIndex = 0

    const interval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayedText(currentLine.slice(0, charIndex + 1))
        charIndex++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [currentLine])

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(currentLine)
      setIsTyping(false)
    } else if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1)
    } else if (onComplete) {
      onComplete()
    }
  }


  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl z-50"
      onClick={handleNext}
    >
      <div className="bg-linear-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-md rounded-2xl border-4 border-slate-600 shadow-2xl p-6 cursor-pointer hover:border-slate-400 transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center text-2xl shrink-0 border-2 border-white/30">
            🛸
          </div>
          <div className="flex-1">
            <h3 className="text-yellow-300 font-bold text-lg mb-2">{speaker}</h3>
            <p className="text-white text-lg leading-relaxed min-h-8">
              {displayedText}
              {isTyping && (
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-5 bg-white ml-1"
                />
              )}
            </p>
          </div>
        </div>

        {!isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-right mt-2 text-yellow-300 text-sm"
          >
            {currentLineIndex < lines.length - 1 ? "▼ Next" : "✓ Continue"}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}