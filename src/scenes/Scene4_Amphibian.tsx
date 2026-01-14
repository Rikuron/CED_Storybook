import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hero } from '../components/general/Hero'
import { PartIntroduction } from '../components/general/PartIntroduction'
import { ShoreWaves } from '../components/scene4/ShoreWaves'
import { SplashEffect } from '../components/scene4/SplashEffect'
import { Amphibian } from '../components/scene4/Amphibian'
import { Footprints } from '../components/scene4/Footprints'
import { NarrationDialogue } from '../components/general/NarrationDialogue'
import { FunfactPopup } from '../components/general/FunfactPopup'
import { Prompt } from '../components/general/Prompt'
import { NextPartButton } from  '../components/general/NextPartButton'
import { useResponsive } from '../hooks/useResponsive'

interface Scene4Props {
  onNext: () => void
}

export const Scene4_Amphibian = ({ onNext }: Scene4Props) => {
  const [showIntro, setShowIntro] = useState(true)
  const [diegoEntered, setDiegoEntered] = useState(false)
  const [showSplash, setShowSplash] = useState(false)
  const [showAmphibian, setShowAmphibian] = useState(false)
  const [amphibianClickable, setAmphibianClickable] = useState(false)
  const [showNarration1, setShowNarration1] = useState(false)
  const [showNarration2, setShowNarration2] = useState(false)
  const [showNarration3, setShowNarration3] = useState(false)
  const [allNarrationsComplete, setAllNarrationsComplete] = useState(false)
  const [showFootprints, setShowFootprints] = useState(false)
  const [footprintsClickable, setFootprintsClickable] = useState(false)
  const [showFunFact, setShowFunFact] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const { isMobile, isTV } = useResponsive()

  useEffect(() => {
    const introTimer = setTimeout(() => setShowIntro(false), 4000)

    const splashTimer = setTimeout(() => setShowSplash(true), 4500)
    const splashEndTimer = setTimeout(() => setShowSplash(false), 5500)

    const diegoTimer = setTimeout(() => setDiegoEntered(true), 5500)

    // Show Tiktaalik after Diego enters
    const amphibianTimer = setTimeout(() => {
      setShowAmphibian(true)
      setShowNarration1(true)
    }, 6500)

    // Make Tiktaalik clickable after it appears
    const clickableTimer = setTimeout(() => setAmphibianClickable(true), 7500)

    return () => {
      clearTimeout(introTimer)
      clearTimeout(splashTimer)
      clearTimeout(splashEndTimer)
      clearTimeout(diegoTimer)
      clearTimeout(amphibianTimer)
      clearTimeout(clickableTimer)
    }
  }, [])

  const handleNarration1Complete = () => {
    setTimeout(() => {
      setShowNarration1(false)
      setTimeout(() => setShowNarration2(true), 500)
    }, 1500)
  }

  const handleNarration2Complete = () => {
    setTimeout(() => {
      setShowNarration2(false)
      setTimeout(() => setShowNarration3(true), 500)
    }, 1500)
  }

  const handleNarration3Complete = () => {
    setTimeout(() => {
      setShowNarration3(false)
      setAllNarrationsComplete(true)
      setFootprintsClickable(true)
    }, 1500)
  }

  const handleAmphibianClick = () => {
    setAmphibianClickable(false)
    setShowFootprints(true)
  }

  const handleAmphibianMoveComplete = () => setShowAmphibian(false)

  const handleFootprintsClick = () => {
    if (!footprintsClickable || !allNarrationsComplete) return

    if (!showFunFact) {
      setShowFunFact(true)
    } else if (!showPrompt) {
      setShowFunFact(false)
      setShowPrompt(true)
    }
  }

  return (
    <motion.div 
      className="w-full h-full relative overflow-hidden" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      {/* Shore Background and Waves */}
      <ShoreWaves />

      {/* Part Introduction */}
      <PartIntroduction 
        title="LIFE MOVES ONTO LAND" 
        highlightWord="MOVES" 
        isVisible={showIntro} 
        textColor="#4B3A19"
        highlightColor="#FFFFFF"
      />

      {/* Splash Effect */}
      <SplashEffect isVisible={showSplash} />

      {/* Hero - Diego */}
      <AnimatePresence>
        {diegoEntered && (
          <Hero 
            x={isMobile ? "10vw" : "20vw"} 
            y={isMobile ? "35vh" : "30vh"} 
            scale={isMobile ? 0.6 : isTV ? 4.0 : 1.25}
            initial={{
              x: isMobile ? "10vw" : "20vw",
              y: isMobile ? "40vh" : "35vh",
              scale: isMobile ? 0.4 : isTV ? 3.0 : 1.25,
              opacity: 0
            }}
            animate={{
              x: isMobile ? "10vw" : "20vw",
              y: isMobile ? "35vh" : "30vh",
              scale: isMobile ? 0.6 : isTV ? 4.0 : 1.25,
              opacity: 1
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>

      {/* Amphibian (Tiktaalik) */}
      <Amphibian  
        isVisible={showAmphibian}
        isClickable={amphibianClickable}
        onClick={handleAmphibianClick}
        onMoveComplete={handleAmphibianMoveComplete}
      />

      {/* Footprints Trail */}
      <Footprints  
        isVisible={showFootprints}
        isClickable={footprintsClickable && allNarrationsComplete}
        onClick={handleFootprintsClick}
      />

      {/* Narration 1 */}
      <AnimatePresence>
        {showNarration1 && (
          <NarrationDialogue 
            text="Diego gasped as he saw creatures crawling out of the water. These organisms evolved lungs to breathe air and stronger limbs to move on land."
            delay={300}
            speed={30}
            onComplete={handleNarration1Complete}
          />
        )}
      </AnimatePresence>

      {/* Narration 2 */}
      <AnimatePresence>
        {showNarration2 && (
          <NarrationDialogue 
            text="Plants had already begun growing on land, producing oxygen and food."
            delay={300}
            speed={30}
            onComplete={handleNarration2Complete}
          />
        )}
      </AnimatePresence>

      {/* Narration 3 */}
      <AnimatePresence>
        {showNarration3 && (
          <NarrationDialogue 
            text="This major evolutionary step allowed life to spread into new environments, avoid competition in the seas, and increase chances of survival."
            delay={300}
            speed={30}
            onComplete={handleNarration3Complete}
          />
        )}
      </AnimatePresence>

      {/* Fun Fact Popup */}
      <AnimatePresence>
        {showFunFact && (
          <FunfactPopup 
            text="Did you know? Amphibians were among the first animals to live both in water and on land."
            delay={0}
          />
        )}
      </AnimatePresence>

      {/* Diego's Question Prompt */}
      <AnimatePresence>
        {showPrompt && (
          <Prompt 
            title="Diego's Question"
            subtitle="What changes were needed to survive on land?"
          />
        )}
      </AnimatePresence>

      {/* Next Part Button */}
      <NextPartButton 
        onClick={onNext}
        isVisible={showPrompt}
      />
    </motion.div>
  )
}