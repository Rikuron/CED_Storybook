import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Hero } from "../components/general/Hero"
import { PartIntroduction } from "../components/general/PartIntroduction"
import { SpeechBubble } from "../components/general/SpeechBubble"
import { FunfactPopup } from "../components/general/FunfactPopup"
import { unicellInfo } from "../data/unicellInfo"
import { FloatingOrganisms } from "../components/scene3/FloatingOrganisms"
import { OrganismInfoBox } from "../components/scene3/OrganismInfoBox"
import { FloatingFish } from "../components/scene3/FloatingFish"
import { Prompt } from "../components/general/Prompt"
import { NextPartButton } from "../components/general/NextPartButton"
import { NarrationDialogue } from "../components/general/NarrationDialogue"
import { useResponsive } from "../hooks/useResponsive"

interface Scene3Props {
  onNext: () => void
}

export const Scene3_Underwater = ({ onNext }: Scene3Props) => {
  const [showPart1Intro, setShowPart1Intro] = useState(true)
  const [diegoEntered, setDiegoEntered] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [hoveredOrganism, setHoveredOrganism] = useState<number | null>(null)
  const [challengeMode, setChallengeMode] = useState(false)
  const [showPart2Intro, setShowPart2Intro] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showFishPhase, setShowFishPhase] = useState(false)
  const [transitionDialoguePhase, setTransitionDialoguePhase] = useState(0)
  const [showFishChallenge, setShowFishChallenge] = useState(false)
  const [isFinalTransition, setIsFinalTransition] = useState(false)
  const [showFinalNarration, setShowFinalNarration] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

  useEffect(() => {
    const introTimer = setTimeout(() => setShowPart1Intro(false), 4000)

    const timer = setTimeout(() => setDiegoEntered(true), 4500)
    const contentTimer = setTimeout(() => setShowContent(true), 6500)

    return () => {
      clearTimeout(introTimer)
      clearTimeout(timer)
      clearTimeout(contentTimer)
    }
  }, [])

  useEffect(() => {
    if (showFinalNarration) {
      const timer = setTimeout(() => onNext(), 5000)

      return () => clearTimeout(timer)
    }
  }, [showFinalNarration, onNext])

  const handleNextPart = () => {
    setIsTransitioning(true)

    setTimeout(() => setShowPart2Intro(true), 1500)
    
    setTimeout(() =>{ 
      setShowPart2Intro(false)
      setShowFishPhase(true)
    }, 5500)
  }

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Underwater Background - CSS Gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: isTransitioning 
            ? 'linear-gradient(180deg, #1e3a5f 0%, #0a1628 50%, #0d2137 100%)'  // Navy - Fish phase
            : 'linear-gradient(180deg, #0a1628 0%, #050d15 50%, #000000 100%)'   // Deep Blue/Black - Bacteria phase
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Secondary overlay for depth effect */}
      <motion.div  
        className="absolute inset-0"
        animate={{
          background: isTransitioning
            ? 'radial-gradient(ellipse at 50% 0%, rgba(30, 80, 130, 0.3) 0%, transparent 60%)'  // Lighter top glow for fish
            : 'radial-gradient(ellipse at 50% 0%, rgba(10, 40, 80, 0.2) 0%, transparent 50%)'   // Darker ambiance for bacteria
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Light rays from above */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          background: isTransitioning
            ? 'linear-gradient(180deg, rgba(100, 180, 255, 0.2) 0%, transparent 50%)'
            : 'linear-gradient(180deg, rgba(50, 100, 150, 0.1) 0%, transparent 40%)',
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          background: { duration: 2, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Floating bubbles */}
      {[...Array(isMobile ? 8 : isTablet ? 12 : isTV ? 30 : 15)].map((_, i) => {
        const baseSize = isMobile ? 4 : isTablet ? 6 : isTV ? 18 : 8
        const sizeVariation = isMobile ? 6 : isTablet ? 10 : isTV ? 30 : 15

        return (
          <motion.div 
            key={`bubble-${i}`}
            className="absolute rounded-full bg-blue-200/30"
            style={{ 
              width: `${baseSize + Math.random() * sizeVariation}px`,
              height: `${baseSize + Math.random() * sizeVariation}px`,
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
        )
      })}

      {/* Part 1 Introduction */}
      <PartIntroduction
        title="THE BEGINNING OF LIFE"
        highlightWord="BEGINNING"
        isVisible={showPart1Intro}
        onComplete={() => setShowPart1Intro(false)}
        textColor="#FFFFFF"
        highlightColor="#C56C6E"
      />

      {/* Hero - Diego */}
      <AnimatePresence>
        {diegoEntered && (
          <Hero 
            x="20vw"
            y="-20vh"
            scale={isMobile ? 0.6 : isTablet ? 1.0 : isTV ? 5.0 : 1.75}
            animate={isTransitioning ? {
              x: isMobile ? "35vw" : isTablet ? "38vw" : isTV ? "40vw" : "40vw",
              y: isMobile ? "45vh" : isTablet ? "42vh" : isTV ? "40vh" : "40vh",
              scale: isMobile ? 0.5 : isTablet ? 0.8 : isTV ? 3.5 : 1.2,
              rotate: 35,
              opacity: 1
            } : {
              x: isMobile ? "10vw" : isTablet ? "12vw" : isTV ? "19vw" : "15vw",
              y: isMobile ? "40vh" : isTablet ? "38vh" : isTV ? "45vh" : "35vh",
              scale: isMobile ? 0.6 : isTablet ? 1.0 : isTV ? 5.0 : 1.5,
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
      <FloatingOrganisms
        challengeMode={challengeMode}
        isTransitioning={isTransitioning}
        hoveredOrganism={hoveredOrganism}
        onHover={setHoveredOrganism}
        onOrganismClick={() => {
          setShowContent(false)
          setTimeout(() => {
            setChallengeMode(true)
            setShowContent(true)
          }, 1500)
        }}
      />

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
        {challengeMode && !isTransitioning && showContent && (
          <Prompt 
            title="Diego's Challenge"
            subtitle="Why do you think life started in water and not on land?"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {challengeMode && !isTransitioning && showContent && (
          <NextPartButton onClick={handleNextPart} />
        )}
      </AnimatePresence>

      {/* Part 2 Introduction */}
      <PartIntroduction
        title="LIFE IN THE WATER"
        highlightWord="LIFE"
        isVisible={showPart2Intro}
        textColor="#FFFFFF"
        highlightColor="#DF4E1E"
      />

      {/* Speed Beams Effect */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {[...Array(isMobile ? 8 : isTablet ? 10 : isTV ? 20 : 12)].map((_, i) => {
              const beamHeight = isMobile ? '1px' : isTablet ? '1.5px' : isTV ? '4px' : '2px'
              const beamWidth = isMobile ? '100px' : isTablet ? '150px' : isTV ? '400px' : '200px'
              
              return (
                <motion.div 
                  key={`speedbeam-${i}`}
                  className="absolute bg-linear-to-l from-white/40 to-transparent"
                  style={{
                    height: beamHeight,
                    width: beamWidth,
                    top: `${10 + i * 7}%`,
                    right: `-${parseInt(beamWidth)}px`
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
              )
            })}
          </>
        )}
      </AnimatePresence>

      {/* Floating Fish */}
      <FloatingFish 
        isVisible={showFishPhase} 
        highlightedFishIndex={transitionDialoguePhase >= 2 && !showFishChallenge && !isFinalTransition ? 2 : null}
        onFishClick={() => setShowFishChallenge(true)}
        exitLeft={isFinalTransition}
      />

      {/* Transition Dialogue Phase 1 */}
      <AnimatePresence>
        {showFishPhase && transitionDialoguePhase === 0 && (
          <NarrationDialogue 
            text="As time passed, Diego noticed changes beneath the ocean. Some organisms developed fins for swimming, gills for breathing underwater, and hard shells for protection."
            delay={2500}
            speed={25}
            onComplete={() => {
              setTimeout(() => setTransitionDialoguePhase(1), 2000)
            }}
          />
        )}
      </AnimatePresence>

      {/* Transition Dialogue Phase 2 */}
      <AnimatePresence>
        {isTransitioning && transitionDialoguePhase === 1 && (
          <NarrationDialogue 
            text="These traits were not random—they helped organisms survive better than others. Over generations, organisms with helpful traits lived longer and reproduced more. This process is known as natural selection."
            delay={500}
            speed={25}
            onComplete={() => {
              setTimeout(() => setTransitionDialoguePhase(2), 2000)
            }}
          />
        )}
      </AnimatePresence>

      {/* Fish Challenge */}
      <AnimatePresence>
        {showFishChallenge && (
          <Prompt 
            title="Question"
            subtitle="Why do you think fins are important for swimming?"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showFishChallenge && (
          <NextPartButton 
            onClick={() => {
              setShowFishChallenge(false)
              setIsFinalTransition(true)
              setTimeout(() => setShowFinalNarration(true), 2000)
            }} 
          />
        )}
      </AnimatePresence>

      {/* Diego Reaction */}
      <AnimatePresence>
        {showFishChallenge && (
          <SpeechBubble 
            text="IT'S BEAUTIFUL!!"
            position={{ top: '30vh', left: '50vw' }}
            delay={300}
            speed={40}
            tailPosition="bottom-left"
            variant="shout"
          />
        )}
      </AnimatePresence>

      {/* Final Narration */}
      <AnimatePresence>
        {showFinalNarration && (
          <Prompt  
            title="Deeper Understanding"
            subtitle="Evolution happens slowly through many generations. Small changes that improve survival become common in a population over time."
            titleColor="#FFFFFF"
          />
        )}
      </AnimatePresence>

    </motion.div>
  )
}