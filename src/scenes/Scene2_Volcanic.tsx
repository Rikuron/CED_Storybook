import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Hero } from "../components/general/Hero"
import { NarrationDialogue } from "../components/general/NarrationDialogue"
import { SpeechBubble } from "../components/general/SpeechBubble"
import { useResponsive } from "../hooks/useResponsive"

interface Scene2Props {
  onNext: () => void
}

export const Scene2_Volcanic = ({ onNext }: Scene2Props) => {
  const [diegoEntered, setDiegoEntered] = useState(false)
  const [showDialogue, setShowDialogue] = useState(false)
  const [dialoguePhase, setDialoguePhase] = useState(0)
  const [isDiving, setIsDiving] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

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

  const handleDive = () => {
    setIsDiving(true)

    setTimeout(() => {
      onNext()
    }, 2000)
  }

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
        style={{ backgroundImage: "url('background/prehistoric_bg.png')" }}
      />

      {/* Dramatic Overlay */}
      <motion.div 
        className="absolute inset-0 bg-linear-to-b from-red-900/40 via-orange-900/30 to-black/50"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Falling Ash - from top to middle */}
      {[...Array(isMobile ? 15 : isTablet ? 20 : isTV ? 40 : 25)].map((_, i) => {
        const baseSize = isMobile ? 1.5 : isTablet ? 2 : isTV ? 12 : 3
        const sizeVariation = isMobile ? 2 : isTablet ? 3 : isTV ? 12 : 4
        const xDrift = isMobile ? 25 : isTablet ? 35 : isTV ? 100 : 50

        

        return (
          <motion.div 
            key={`ash-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${baseSize + Math.random() * sizeVariation}px`,
              height: `${baseSize + Math.random() * sizeVariation}px`,
              background: `rgba(${150 + Math.random() * 100}, ${50 + Math.random() * 50}, 0, 0.7)`,
              left: `${Math.random() * 100}%`,
              top: '-5%',
            }}
            animate={{
              y: [0, window.innerHeight * 0.5],
              x: [0, (Math.random() - 0.5) * xDrift],
              opacity: [0.8, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeIn"
            }}
          />
        )
      })}

      {/* Rising Bubbles - from bottom to middle */}
      {[...Array(isMobile ? 10 : isTablet ? 15 : isTV ? 30 : 20)].map((_, i) => {
        const baseSize = isMobile ? 4 : isTablet ? 6 : isTV ? 18 : 8
        const sizeVariation = isMobile ? 6 : isTablet ? 10 : isTV ? 30 : 15
        const xDrift = isMobile ? 15 : isTablet ? 20 : isTV ? 60 : 30

        return (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-blue-300/50"
            style={{
              width: `${baseSize + Math.random() * sizeVariation}px`,
              height: `${baseSize + Math.random() * sizeVariation}px`,
              left: `${Math.random() * 100}%`,
              bottom: '0%',
            }}
            animate={{
              y: [0, -window.innerHeight * 0.3],
              x: [0, (Math.random() - 0.5) * xDrift],
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
        )
      })}

      {/* Hero Character - Diego */}
      <AnimatePresence>
        {diegoEntered && (
          <Hero 
            x="25vw"
            y="-20vh"
            scale={isMobile ? 0.5 : isTablet ? 0.8 : isTV ? 4.5 : 1.25}
            animate={isDiving ? {
              x: '43vw',
              y: '80vh',
              scale: 0.8,
              opacity: 0
            } : {
              x: isMobile ? "15vw" : isTablet ? "15vw" : isTV ? "17.5vw" : "15vw",
              y: isMobile ? "17.5vh" : isTablet ? "17.5vh" : isTV ? "25vh" : "17.5vh",
              scale: isMobile ? 0.5 : isTablet ? 0.8 : isTV ? 4.5 : 1.25,
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

      {/* Diego's Speech Bubble 1 */}
      <AnimatePresence>
        {showDialogue && dialoguePhase === 0 && (
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

      {/* First Narration Dialogue */}
      <AnimatePresence>
        {showDialogue && dialoguePhase === 0 && (
          <NarrationDialogue 
            text="Diego stepped onto a strange version of Earth—hot, rocky, and empty. There were no trees, animals, or people. The oceans were forming, filled with chemicals and energy from heat and lightning."
            delay={500}
            speed={25}
            onComplete={() => setTimeout(() => setDialoguePhase(1), 2500)}
          />
        )}
      </AnimatePresence>

      {/* Diego's Speech Bubble 2 */}
      <AnimatePresence>
        {showDialogue && dialoguePhase === 1 && (
          <SpeechBubble
            text="?"
            position={{ top: '12vh', left: '26vw' }}
            delay={500}
            speed={40}
            tailPosition="bottom-left"
            variant="thought"
          />
        )}
      </AnimatePresence>

      {/* Second Narration Dialogue */}
      <AnimatePresence>
        {dialoguePhase === 1 && (
          <NarrationDialogue 
            text="Deep beneath the water, tiny living organisms appeared. These single-celled organisms were the first life forms, capable of reproduction and basic survival."
            delay={500}
            speed={25}
            onComplete={() => setTimeout(() => setDialoguePhase(2), 2500)}
          />
        )}
      </AnimatePresence>

      {/* Diego's Speech Bubble 3 */}
      <AnimatePresence>
        {showDialogue && dialoguePhase === 2 && (
          <SpeechBubble
            text="Ayt bet"
            position={{ top: '12vh', left: '26vw' }}
            delay={500}
            speed={40}
            tailPosition="bottom-left"
            variant="normal"
          />
        )}
      </AnimatePresence>

      {/* Third Narration Dialogue */}
      <AnimatePresence>
        {dialoguePhase === 2 && (
          <NarrationDialogue 
            text="Though simple, they carried the building blocks of all future life."
            delay={500}
            speed={25}
            onComplete={() => setTimeout(() => setDialoguePhase(3), 2500)}
          />
        )}
      </AnimatePresence>


      {/* Orb to Proceed */}
      <AnimatePresence>
        {dialoguePhase === 3 && !isDiving && (
          <motion.div
            className="absolute z-40 cursor-pointer"
            style={{
              left: '47%',
              bottom: '20%',
              transform: 'translateX(-50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={handleDive}
          >
            {/* Glow Effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-400/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ filter: 'blur(20px)' }}
            />

            {/* Orb */}
            <motion.div
              className="rounded-full bg-linear-to-br from-cyan-300/40 via-blue-400/40 to-blue-600/40 shadow-lg"
              style={{
                width: isMobile ? '3.5rem' : isTablet ? '5rem' : isTV ? '20rem' : '7rem',
                height: isMobile ? '3.5rem' : isTablet ? '5rem' : isTV ? '20rem' : '7rem'
              }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(59, 130, 246, 0.6)',
                  '0 0 60px rgba(59, 130, 246, 0.8)',
                  '0 0 30px rgba(59, 130, 246, 0.6)'
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1 }}
            />
            
            {/* Click hint */}
            <motion.p
              className={`absolute ${isTV ? '-bottom-24' : '-bottom-8'} left-1/2 -translate-x-1/2 text-white font-canva-sans-bold whitespace-nowrap ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : isTV ? 'text-6xl' : 'text-base'}`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
            >
              Click to Explore
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diving effect - water overlay */}
      <AnimatePresence>
        {isDiving && (
          <motion.div
            className="absolute inset-0 z-50 bg-linear-to-b from-transparent via-blue-900/50 to-blue-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>

    </motion.div>
  )
}