import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Hero } from "../components/Hero"
import { TypeWriter } from "../components/TypeWriter"
import { SpeechBubble } from "../components/SpeechBubble"

interface Scene2Props {
  onNext: () => void
}

export const Scene2_Volcanic = ({ onNext }: Scene2Props) => {
  const [diegoEntered, setDiegoEntered] = useState(false)
  const [showDialogue, setShowDialogue] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDiegoEntered(true)
    }, 500)

    const dialogueTimer = setTimeout(() => {
      setShowDialogue(true)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(dialogueTimer)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Volcanic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('Initial Assets/prehistoric_bg.png')" }}
      />

      {/* Dramatic Overlay */}
      <motion.div 
        className="absolute inset-0 bg-linear-to-b from-red-900/40 via-orange-900/30 to-black/50"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Falling Ash - from top to middle */}
      {[...Array(25)].map((_, i) => (
        <motion.div 
          key={`ash-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `rgba(${150 + Math.random() * 100}, ${50 + Math.random() * 50}, 0, 0.7)`,
            left: `${Math.random() * 100}%`,
            top: '-5%',
          }}
          animate={{
            y: [0, window.innerHeight * 0.5],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0.8, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeIn"
          }}
        />
      ))}

      {/* Rising Bubbles - from bottom to middle */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full bg-blue-300/50"
          style={{
            width: `${8 + Math.random() * 15}px`,
            height: `${8 + Math.random() * 15}px`,
            left: `${Math.random() * 100}%`,
            bottom: '0%',
          }}
          animate={{
            y: [0, -window.innerHeight * 0.5],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1, 0.3]
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Hero Character - Diego */}
      <AnimatePresence>
        {diegoEntered && (
          <Hero 
            x="25vw"
            y="-20vh"
            scale={1.5}
            animate={{
              x: "15vw",
              y: "17.5vh",
              scale: 1.5,
              opacity: 1
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut"
            }}
            shake={true}
          />
        )}
      </AnimatePresence>

      {/* Diego's Speech Bubble */}
      <AnimatePresence>
        {showDialogue && (
          <SpeechBubble
            text="What the...!"
            position={{ top: '12vh', left: '26vw' }}
            delay={500}
            speed={40}
            tailPosition="bottom-left"
            variant="shout"
          />
        )}
      </AnimatePresence>

      {/* Dialogue */}
      <AnimatePresence>
        {showDialogue && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p 
              className="text-lg md:text-xl lg:text-2xl text-center"
              style={{ WebkitTextStroke: '1px #000000' }}
            >
              <TypeWriter
                text="Diego stepped onto a strange version of Earth—hot, rocky, and empty. There were no trees, animals, or people. The oceans were forming, filled with chemicals and energy from heat and lightning."
                delay={500}
                speed={25}
                className="text-white font-canva-sans-bold"
                onComplete={() => {}}
              />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}