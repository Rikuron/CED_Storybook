import { motion } from 'framer-motion'
import { Hero } from '../components/Hero'
import { DialogueBox } from '../components/DialogueBox'
import { Microbe } from '../components/Microbe'
import { microbeFacts } from '../data/storyContent'

interface Scene6Props {
  onNext?: () => void
}

export const Scene6_Microscopic = ({ onNext: _onNext }: Scene6Props) => {
  const microbePositions = [
    { x: 20, y: 30 },
    { x: 70, y: 25 },
    { x: 40, y: 60 },
    { x: 80, y: 70 }
  ]

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Deep Ocean Background */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-900 via-blue-950 to-black" />

      {/* Underwater Light Rays */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-24 h-full bg-linear-to-b from-cyan-300/10 to-transparent"
          style={{ left: `${i * 20}%`}}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scaleX: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}

      {/* Microbes */}
      {microbeFacts.map((microbe, index) => (
        <Microbe
          key={microbe.id}
          id={microbe.id}
          name={microbe.name}
          fact={microbe.fact}
          color={microbe.color}
          initialX={microbePositions[index].x}
          initialY={microbePositions[index].y}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Diego */}
      <Hero 
        x="10%"
        y="20%"
        scale={0.8}
      />

      {/* Dialogue */}
      <DialogueBox
        lines={[
          "Amazing! These are the first life forms!",
          "Click on them to learn more!",
        ]}
      />
    </motion.div>
  )
}