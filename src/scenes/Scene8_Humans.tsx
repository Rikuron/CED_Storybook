import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hero } from '../components/general/Hero'
import { PartIntroduction } from '../components/general/PartIntroduction'
import { WindGusts } from '../components/general/WindGusts'
import { NarrationDialogue } from '../components/general/NarrationDialogue'
import { Human } from '../components/scene8/Human'
import { TimeSlider } from '../components/scene8/TimeSlider'
import { SpeciesName } from '../components/scene8/SpeciesName'
import { Prompt } from '../components/general/Prompt'
import { NextPartButton } from '../components/general/NextPartButton'
import { VerticalWindGusts } from '../components/scene8/VerticalWindGusts'
import { ExitToSpaceOverlay } from '../components/scene8/ExitToSpaceOverlay'
import { useResponsive } from '../hooks/useResponsive'

const humanSpecies = [
  { 
    id: 0,
    name: 'Australopithecus',
    image: '/initial_assets/12.1_Australopithecus.png',
    position: 5
  },
  {
    id: 1,
    name: 'Homo Habilis',
    image: '/initial_assets/12.2_Homo habilis.png',
    position: 25
  },
  {
    id: 2,
    name: 'Homo Erectus',
    image: '/initial_assets/12.3_Homo erectus.png',
    position: 50
  },
  {
    id: 3,
    name: 'Neanderthals',
    image: '/initial_assets/12.4_Neanderthals.png',
    position: 75
  },
  {
    id: 4,
    name: 'Homo Sapiens (Us!)',
    image: '/initial_assets/12.5_Homo Sapiens.png',
    position: 95
  }
]

interface Scene8Props {
  onNext: () => void
}

export const Scene8_Humans = ({ onNext }: Scene8Props) => {
  const [showWindGusts, setShowWindGusts] = useState(true)
  const [isDiegoStopped, setIsDiegoStopped] = useState(false)
  const [showHuman, setShowHuman] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [showNarration1, setShowNarration1] = useState(false)
  const [showNarration2, setShowNarration2] = useState(false)
  const [showTimeSlider, setShowTimeSlider] = useState(false)
  const [showSpeciesName, setShowSpeciesName] = useState(false)
  const [currentSpeciesIndex, setCurrentSpeciesIndex] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [isLeavingEarth, setIsLeavingEarth] = useState(false)
  const [showVerticalWindGusts, setShowVerticalWindGusts] = useState(false)
  
  const { isMobile, isTablet, isTV } = useResponsive()

  useEffect(() => {
    const humanTimer = setTimeout(() => {
      setShowHuman(true)
      setIsDiegoStopped(true)
      setShowWindGusts(false)
    }, 4000)

    const introTimer = setTimeout(() => setShowIntro(true), 5000)

    const narration1Timer = setTimeout(() => {
      setShowIntro(false)
      setShowNarration1(true)
    }, 8500)

    return () => {
      clearTimeout(humanTimer)
      clearTimeout(introTimer)
      clearTimeout(narration1Timer)
    }
  }, [])

  useEffect(() => {
    if (!showTimeSlider) return
    
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 3000))
      setCurrentSpeciesIndex(1) // Homo habilis
      await new Promise(r => setTimeout(r, 3000))
      setCurrentSpeciesIndex(2) // Homo erectus
      await new Promise(r => setTimeout(r, 3000))
      setCurrentSpeciesIndex(3) // Neanderthals
      await new Promise(r => setTimeout(r, 3000))
      setCurrentSpeciesIndex(4) // Homo sapiens

      // Show prompt
      await new Promise(r => setTimeout(r, 3000))
      setShowTimeSlider(false)
      setShowSpeciesName(false)
      await new Promise(r => setTimeout(r, 500))
      setShowPrompt(true)
      setShowNextButton(true)
    }

    sequence()
  }, [showTimeSlider])

  const handleNarration1Complete = () => {
    setTimeout(() => {
      setShowNarration1(false)
      setShowNarration2(true)
    }, 1000)
  }

  const handleNarration2Complete = () => {
    setTimeout(() => {
      setShowNarration2(false)
      setShowTimeSlider(true)
      setShowSpeciesName(true)
    }, 1000)
  }

  const getDiegoPosition = () => {
    if (isLeavingEarth) {
      return {
        x: isMobile ? '40vw' : isTablet ? '45vw' : isTV ? '45vw' : '45vw',
        y: '-30vh',
        scale: isMobile ? 0.8 : isTablet ? 1.5 : isTV ? 6.0 : 2.0,
        rotate: -15
      }
    }

    if (!isDiegoStopped) {
      return {
        x: isMobile ? '40vw' : isTV ? '42vw' : '45vw',
        y: isMobile ? '40vh' : isTV ? '42vh' : '45vh',
        scale: isMobile ? 0.8 : isTablet ? 1.2 : isTV ? 6.0 : 1.5,
        rotate: 15
      }
    }

    return {
      x: isMobile ? '15vw' : isTablet ? '20vw' : isTV ? '25vw' : '22vw',
      y: isMobile ? '35vh' : isTablet ? '40vh' : isTV ? '45vh' : '40vh',
      scale: isMobile ? 0.6 : isTablet ? 1.25 : isTV ? 5.0 : 1.5,
      rotate: 0
    }
  }

  const handleNextPartClick = () => {
    setShowPrompt(false)
    setShowNextButton(false)
    setShowHuman(false)
    setIsLeavingEarth(true)
    setShowVerticalWindGusts(true)

    setTimeout(() => onNext(), 3000)
  }

  const diegoPos = getDiegoPosition()

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background - Same as Scene 7 */}
      <img
        src="/background/scene5_bg.png"
        alt="Humans era background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Wind Gusts Effect */}
      <WindGusts isVisible={showWindGusts} />

      {/* Diego - Hero */}
      <Hero
        x={diegoPos.x}
        y={diegoPos.y}
        scale={diegoPos.scale}
        initial={{
          x: '-20vw',
          y: isMobile ? '40vh' : '45vh',
          scale: isMobile ? 0.6 : isTablet ? 1.0 : isTV ? 3.5 : 1.2,
          rotate: 15,
          opacity: 0
        }}
        animate={{
          x: diegoPos.x,
          y: diegoPos.y,
          scale: diegoPos.scale,
          rotate: diegoPos.rotate,
          opacity: 1
        }}
        transition={{
          duration: isDiegoStopped ? 1.5 : 1.5,
          ease: 'easeInOut'
        }}
      />

      {/* Early Human */}
      <Human 
        isVisible={showHuman} 
        imageSrc={humanSpecies[currentSpeciesIndex].image}
      />

      {/* Part Introduction */}
      <PartIntroduction
        title="EARLY HUMANS"
        highlightWord="HUMANS"
        isVisible={showIntro}
        textColor="#FFFFFF"
        highlightColor="#361E1A"
        showTextStroke={false}
      />

      {/* Narration Dialogue 1 */}
      <AnimatePresence>
        {showNarration1 && (
          <NarrationDialogue
            text="Diego met early humans who walked upright, made tools, and worked together in groups."
            voiceoverSrc="/audio/dialogue/Narration_8-1.mp3"
            delay={500}
            onComplete={handleNarration1Complete}
          />
        )}
      </AnimatePresence>

      {/* Narration Dialogue 2 */}
      <AnimatePresence>
        {showNarration2 && (
          <NarrationDialogue
            text="Their growing brains allowed problem-solving, communication, and cooperation. Cultural evolution—learning and sharing knowledge—became a powerful survival advantage for humans."
            voiceoverSrc="/audio/dialogue/Narration_8-2.mp3"
            delay={500}
            onComplete={handleNarration2Complete}
          />
        )}
      </AnimatePresence>

      {/* Time Slider */}
      <AnimatePresence>
        {showTimeSlider && (
          <TimeSlider 
            isVisible={showTimeSlider} 
            currentPosition={humanSpecies[currentSpeciesIndex].position} 
          />
        )}
      </AnimatePresence>

      {/* Species Name */}
      <SpeciesName 
        isVisible={showSpeciesName} 
        name={humanSpecies[currentSpeciesIndex].name}
      />

      {/* Prompt */}
      <Prompt 
        title="Reflection Question"
        subtitle="How does knowledge help humans survive?"
        titleColor="#FFFFFF"
        isVisible={showPrompt}
      />

      {/* Next Part Button */}
      <NextPartButton 
        onClick={handleNextPartClick}
        isVisible={showNextButton}
      />

      {/* Vertical Wind Gusts - Going upward */}
      <VerticalWindGusts isVisible={showVerticalWindGusts} />

      {/* Sky/Clouds Exit Overlay */}
      <ExitToSpaceOverlay isVisible={isLeavingEarth} />
    </motion.div>
  )
}