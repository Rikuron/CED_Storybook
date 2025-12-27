import { motion } from 'framer-motion'
import { useState } from 'react'

interface MicrobeProps {
  id: number
  color: string
  name: string
  fact: string
  initialX: number
  initialY: number
  onSelect?: (id: number) => void
}

export const Microbe = ({ id, color, name, fact, initialX, initialY, onSelect }: MicrobeProps) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    if (!isSelected) {
      setIsSelected(true)
      onSelect?.(id)
      console.log(`🎵 Blub! (Sound for ${name})`)
    }
  }

  if (isSelected) {
    return (
      <motion.div
        layoutId={`microbe-${id}`}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => setIsSelected(false)}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md border-4 shadow-2xl"
          style={{ borderColor: color }}
        >
          <div 
            className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color}dd, ${color}44)`,
              boxShadow: `0 0 60px ${color}88`,
            }}
          />
          <h2 className="text-3xl font-bold text-center text-white mb-4">{name}</h2>
          <p className="text-white/90 text-lg leading-relaxed text-center">{fact}</p>
          <p className="text-center mt-6 text-yellow-300 text-sm">Click anywhere to close</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layoutId={`microbe-${id}`}
      className="absolute cursor-pointer"
      style={{ left: `${initialX}%`, top: `${initialY}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, Math.random() * 40 - 20, 0],
        y: [0, Math.random() * 40 - 20, 0],
        opacity: 1,
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.3 }}
      onClick={handleClick}
    >
      <div 
        className="w-20 h-20 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}dd, ${color}44)`,
          boxShadow: `0 0 30px ${color}88`,
        }}
      />
    </motion.div>
  )
}