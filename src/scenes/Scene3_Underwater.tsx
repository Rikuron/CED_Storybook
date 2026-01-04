import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Hero } from "../components/Hero"
import { SpeechBubble } from "../components/SpeechBubble"
import { FunfactPopup } from "../components/FunfactPopup"
import { unicellInfo } from "../data/unicellInfo"
import { OrganismInfoBox } from "../components/OrganismInfoBox"
import { ChallengePrompt } from "../components/ChallengePrompt"

interface Scene3Props {
  onNext: () => void
}

export const Scene3_Underwater = ({ onNext }: Scene3Props) => {
  const [diegoEntered, setDiegoEntered] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [hoveredOrganism, setHoveredOrganism] = useState<number | null>(null)
  const [challengeMode, setChallengeMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDiegoEntered(true), 500)
    const contentTimer = setTimeout(() => setShowContent(true), 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(contentTimer)
    }
  }, [])

  const handleNextPart = () => {
    setIsTransitioning(true)
    // setTimeout(() => {
    //   onNext()
    // }, 2500)
  }

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
            animate={isTransitioning ? {
              x: "40vw",
              y: "40vh",
              scale: 1.2,
              rotate: 35,
              opacity: 1
            } : {
              x: "15vw",
              y: "35vh",
              scale: 1.5,
              rotate: 0,
              opacity: 1
            }}
            transition={{
              duration: isTransitioning ? 0.5 : 1.5,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showContent && !challengeMode && (
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

      {/* Challenge Mode Speech Bubble */}
      <AnimatePresence>
        {challengeMode && !isTransitioning && (
          <SpeechBubble 
            text="WHAT THE!"
            position={{ top: '26vh', left: '26vw' }}
            delay={300}
            speed={40}
            tailPosition="bottom-left"
            variant="shout"
          />
        )}
      </AnimatePresence>

      {/* Fun Fact Popup */}
      <AnimatePresence>
        {showContent && !challengeMode && (
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
          className={`absolute ${challengeMode ? '' : 'cursor-pointer'} ${hoveredOrganism === org.id ? 'z-50' : 'z-20'}`}
          style={{ left: org.position.x, top: org.position.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isTransitioning ? {
            opacity: 0,
            x: '-100vw',
            scale: challengeMode ? 5 : 2
          } : {
            opacity: 1,
            scale: challengeMode ? 5 : 2,
            y: [0, -10, 0]
          }}
          transition={{
            y: {
              duration: org.floatDuration || 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              delay: 2 + org.id * 0.3,
              duration: 0.5
            },
            scale: { duration: 0.5 }
          }}
          onHoverStart={() => !challengeMode && setHoveredOrganism(org.id)}
          onHoverEnd={() => !challengeMode && setHoveredOrganism(null)}
          whileHover={challengeMode ? {} : { scale: 2.5 }}
          onClick={() => setChallengeMode(true)}
        >
          <img 
            src={org.image} 
            alt={org.scientific_name}
            style={{ width: org.size, height: 'auto' }}
            className="drop-shadow-lg"
          />
        </motion.div>
      ))}

      {/* Info Box on hover */}
      <AnimatePresence>
        {hoveredOrganism && !challengeMode && (
          <OrganismInfoBox 
            organism={unicellInfo.find(org => org.id === hoveredOrganism)!} 
            position={unicellInfo.find(org => org.id === hoveredOrganism)!.position}
          />
        )}
      </AnimatePresence>

      {/* Challenge Prompt */}
      <AnimatePresence>
        {challengeMode && !isTransitioning && (
          <ChallengePrompt  
            title="Diego's Challenge"
            question="Why do you think life started in water and not on land?"
            onNext={handleNextPart}
          />
        )}
      </AnimatePresence>

      {/* Speed Beams Effect */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={`speedbeam-${i}`}
                className="absolute bg-linear-to-l from-white/40 to-transparent"
                style={{
                  height: '2px',
                  width: '200px',
                  top: `${10 + i * 7}%`,
                  right: '-200px'
                }}
                initial={{ x: 0, opacity: 0 }}
                animate={{ 
                  x: [0, -window.innerWidth - 400],  
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

    </motion.div>
  )
}