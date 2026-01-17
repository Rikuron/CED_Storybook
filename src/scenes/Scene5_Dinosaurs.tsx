import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Hero } from '../components/general/Hero'
import { PartIntroduction } from '../components/general/PartIntroduction'
import { WindGusts } from '../components/general/WindGusts'
import { NarrationDialogue } from '../components/general/NarrationDialogue'
import { DinosaurLand } from '../components/scene5/DinosaurLand'
import { DinosaurInfoBox } from '../components/scene5/DinosaurInfoBox'
import { dinosaurData } from '../data/dinosaurInfo'
import { QuestionMarkButton } from '../components/scene5/QuestionMarkButton'
import { useResponsive } from '../hooks/useResponsive'
import { DinosaurChallenge } from '../components/scene5/DinosaurChallenge'

interface Scene5Props {
  onNext: () => void
}

export const Scene5_Dinosaurs = ({ onNext }: Scene5Props) => {
  const [showWindGusts, setShowWindGusts] = useState(true)
  const [showLand, setShowLand] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [showNarration1, setShowNarration1] = useState(false)
  const [showNarration2, setShowNarration2] = useState(false)
  const [isLanding, setIsLanding] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [selectedDinosaur, setSelectedDinosaur] = useState<'smaller' | 'bigger' | null>(null)
  const [showQuestionMark, setShowQuestionMark] = useState(false)
  const [showChallenge, setShowChallenge] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

  const smallerRoarRef = useRef<HTMLAudioElement | null>(null)
  const biggerRoarRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => { 
    smallerRoarRef.current = new Audio('/audio/sfx/Velociraptor_Audio.mp3')
    biggerRoarRef.current = new Audio('/audio/sfx/Brachiosaurus_Audio.mp3')

    const landingTimer = setTimeout(() => {
      setIsLanding(true)
      setShowWindGusts(false)
      setShowLand(true)
    }, 3000)

    const introTimer = setTimeout(() => {
      setShowIntro(true)
    }, 4500)

    const narration1Timer = setTimeout(() => {
      setShowIntro(false)
      setShowNarration1(true)
    }, 6000)

    return () => {
      clearTimeout(landingTimer)
      clearTimeout(introTimer)
      clearTimeout(narration1Timer)
    }
  }, [])

  const getDiegoPosition = () => {
    if (!isLanding) {
      return {
        x: isMobile ? '40vw' : isTV ? '42vw' : '45vw',
        y: isMobile ? '40vh' : isTV ? '42vh' : '45vh',
        scale: isMobile ? 0.8 : isTablet ? 1.2 : isTV ? 6.0 : 1.5,
        rotate: 15
      }
    }

    return {
      x: isMobile ? '8vw' : isTablet ? '8vw' : isTV ? '12.5vw' : '12vw',
      y: isMobile ? '15vw' : isTablet ? '13vh' : isTV ? '18vh' : '18vh',
      scale: isMobile ? 0.5 : isTablet ? 0.8 : isTV ? 5.0 : 1.0,
      rotate: 0
    }
  }

  const handleNarrationComplete = () => {
    setTimeout(() => {
      setShowNarration1(false)
      setShowNarration2(true)
      setIsInteractive(true)
    }, 2000)
  }

  const handleDinosaurClick = (dinosaur: 'smaller' | 'bigger') => {
    if (dinosaur === 'smaller' && smallerRoarRef.current) {
      smallerRoarRef.current.currentTime = 0
      smallerRoarRef.current.play()
    } else if (dinosaur === 'bigger' && biggerRoarRef.current) {
      biggerRoarRef.current.currentTime = 0
      biggerRoarRef.current.play()
    }

    setSelectedDinosaur(prev => prev === dinosaur ? null : dinosaur)
  }

  const handleBackgroundClick = () => {
    if (selectedDinosaur) setSelectedDinosaur(null)
  }

  const diegoPos = getDiegoPosition()

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackgroundClick}
    >
      {/* Background */}
      <img
        src="/background/scene5_bg.png"
        alt="Dinosaur era background"
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
          duration: isLanding ? 2.5 : 1.5,
          ease: 'easeInOut'
        }}
      />

      {/* Land with Dinosaurs */}
      <DinosaurLand 
        isVisible={showLand} 
        isInteractive={isInteractive}
        onDinosaurClick={handleDinosaurClick}  
      />

      {/* Dinosaur Info Box */}
      <AnimatePresence>
        {selectedDinosaur && (
          <DinosaurInfoBox  
            dinosaur={dinosaurData[selectedDinosaur]}
            position={selectedDinosaur === 'smaller' ? 'left' : 'right'}
          />
        )}
      </AnimatePresence>

      {/* Part Introduction */}
      <PartIntroduction
        title="THE AGE OF DINOSAURS"
        highlightWord="DINOSAURS"
        isVisible={showIntro}
        textColor="#FFFFFF"
        highlightColor="#055332"
        showTextStroke={false}
      />

      {/* Narration 1 */}
      <AnimatePresence>
        {showNarration1 && (
          <NarrationDialogue 
            text="Diego entered an age dominated by dinosaurs. He met giant herbivores that ate plants and fierce predators with sharp teeth."
            voiceoverSrc="/audio/dialogue/Narration_5-1.mp3"
            delay={300}
            speed={30}
            onComplete={handleNarrationComplete}
          />
        )}
      </AnimatePresence>

      {/* Narration 2 */}
      <AnimatePresence>
        {showNarration2 && (
          <NarrationDialogue 
            text="Dinosaurs evolved different traits—size, speed, and armor—to survive in their environments. Becauase of these adaptations, dinosaurs ruled Earth for millions of years."
            voiceoverSrc="/audio/dialogue/Narration_5-2.mp3"
            delay={300}
            speed={30}
            onComplete={() => {
              setTimeout(() => {
                setShowNarration2(false)  // Fade out narration first
                setTimeout(() => setShowQuestionMark(true), 1000)  // Then show question mark
              }, 1500)
            }}
          />
        )}
      </AnimatePresence>

      {/* Question Mark Button */}
      <QuestionMarkButton 
        isVisible={showQuestionMark && !showChallenge} 
        onClick={() => {
          setShowQuestionMark(false)
          setShowChallenge(true)
        }} 
      />

      {/* Comparison Challenge */}
      <DinosaurChallenge
        isVisible={showChallenge}
        onNext={onNext}
      />
    </motion.div>
  )
}