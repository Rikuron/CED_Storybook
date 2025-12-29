import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface TypeWriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export const TypeWriter = ({
  text,
  delay = 0,
  speed = 50,
  className= "",
  onComplete
}: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)
  const [_completed, setCompleted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let currentIndex = 0
    let hasCompleted = false

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        if (!hasCompleted) {
          hasCompleted = true
          clearInterval(interval)
          setCompleted(true)
          onComplete?.()
        }
      }
    }, speed)

    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {displayedText}
      {displayedText.length < text.length && started && (
        <span className="animate-pulse">|</span>
      )}
    </motion.span>
  )
}