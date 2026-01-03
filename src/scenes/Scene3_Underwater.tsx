import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Hero } from "../components/Hero"
import { SpeechBubble } from "../components/SpeechBubble"
import { FunfactPopup } from "../components/FunfactPopup"
import { unicellInfo } from "../data/unicellInfo"

interface Scene3Props {
  onNext: () => void
}

export const Scene3_Underwater = ({ onNext }: Scene3Props) => {
  const [diegoEntered, setDiegoEntered] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [enlargedOrganism, setEnlargedOrganism] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDiegoEntered(true), 500)
    const contentTimer = setTimeout(() => setShowContent(true), 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Underwater Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('Initial Assets/sea.png')"}}
      />

      {/* Dark overlay for depth */}
      <div  
        className="absolute inset-0 bg-linear-to-b from-blue-900/30 via-transparent to-blue-950/50"
      />

      {/* Light rays from above */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(100,200,255,0.15) 0%, transparent 40%)' }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating bubbles */}
      {[...Array(15)].map((_, i) => (
        <motion.div 
          key={`bubble-${i}`}
          className="absolute rounded-full bg-blue-200/30"
          style={{ 
            width: `${5 + Math.random() * 10}px`,
            height: `${5 + Math.random() * 10}px`,
            left: `${Math.random() * 100}%`,
            bottom: '0%'
          }}
          animate={{
            y: [0, - window.innerHeight],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Hero - Diego */}
      <AnimatePresence>
        {diegoEntered && (
          <Hero 
            x="20vw"
            y="-20vh"
            scale={1.75}
            animate={{
              x: "15vw",
              y: "35vh",
              scale: 1.5,
              opacity: 1
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showContent && !enlargedOrganism && (
          <SpeechBubble
            text="Oh, it's not that bad"
            position={{ top: '26vh', left: '26vw' }}
            delay={500}
            speed={40}
            tailPosition="bottom-left"
            variant="normal"
          />
        )}
      </AnimatePresence>

      {/* Fun Fact Popup */}
      <AnimatePresence>
        {showContent && (
          <FunfactPopup 
            text="The earliest life forms were single-celled organisms."
            delay={1}
          />
        )}
      </AnimatePresence>

      {/* Floating Organisms */}
      {unicellInfo.map((org) => (
      <motion.div
        key={org.id}
        className="absolute cursor-pointer z-20"
        style={{ left: org.position.x, top: org.position.y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={enlargedOrganism === org.id ? {
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          scale: 4,
          opacity: 1,
          zIndex: 50
        } : {
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={enlargedOrganism === org.id ? {
          duration: 0.5,
          ease: "easeOut"
        } : {
          y: {
            duration: org.floatDuration || 2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          opacity: { delay: 2 + org.id * 0.3, duration: 0.5 }
        }}
        onClick={() => setEnlargedOrganism(enlargedOrganism === org.id ? null : org.id)}
        whileHover={{ scale: enlargedOrganism ? 1 : 1.2 }}
      >
        <img 
          src={org.image} 
          alt={org.scientific_name}
          style={{ width: org.size, height: 'auto' }}
          className="drop-shadow-lg"
        />
      </motion.div>
    ))}
    {/* Dark overlay when organism is enlarged */}
    <AnimatePresence>
      {enlargedOrganism && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setEnlargedOrganism(null)}
        />
      )}
    </AnimatePresence>

    </motion.div>
  )
}