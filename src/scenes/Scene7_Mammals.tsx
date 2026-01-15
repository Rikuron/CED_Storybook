import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hero } from '../components/general/Hero'
import { PartIntroduction } from '../components/general/PartIntroduction'
import { WindGusts } from '../components/general/WindGusts'
import { FunfactPopup } from '../components/general/FunfactPopup'
import { NextPartButton } from '../components/general/NextPartButton'
import { Mammal } from '../components/scene7/Mammal'
import { MammalInfoBox } from '../components/scene7/MammalInfoBox'
import { type MammalInfo } from '../data/mammalInfo'
import { useResponsive } from '../hooks/useResponsive'

interface Scene7Props {
  onNext: () => void
}

export const Scene7_Mammals = ({ onNext }: Scene7Props) => {
  const [showWindGusts, setShowWindGusts] = useState(true)
  const [showIntro, setShowIntro] = useState(false)
  const [showMammals, setShowMammals] = useState(false)
  const [showFunFact, setShowFunFact] = useState(false)
  const [isLanding, setIsLanding] = useState(false)
  const [selectedMammal, setSelectedMammal] = useState<MammalInfo | null>(null)
  const { isMobile, isTablet, isTV } = useResponsive()
  
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(true)
    }, 1000)
    
    const landingTimer = setTimeout(() => {
      setIsLanding(true)
      setShowWindGusts(false)
    }, 3000)

    const mammalsTimer = setTimeout(() => {
      setShowMammals(true)
    }, 4500)

    const hideIntroTimer = setTimeout(() => {
      setShowIntro(false)
      setShowFunFact(true)
    }, 7500)

    return () => {
      clearTimeout(landingTimer)
      clearTimeout(introTimer)
      clearTimeout(mammalsTimer)
      clearTimeout(hideIntroTimer)
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
      x: isMobile ? '8vw' : isTablet ? '15vw' : isTV ? '15vw' : '15vw',
      y: isMobile ? '12vw' : isTablet ? '35vh' : isTV ? '35vh' : '35vh',
      scale: isMobile ? 0.5 : isTablet ? 1.0 : isTV ? 6.0 : 1.2,
      rotate: 0
    }
  }

  const handleMammalClick = (mammal: MammalInfo) => {
    setSelectedMammal(prev => prev?.id === mammal.id ? null : mammal)
  }

  const handleBackgroundClick = () => {
    if (selectedMammal) setSelectedMammal(null)
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
        src="/background/scene7_bg.png"
        alt="Mammals era background"
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

      {/* Part Introduction */}
      <PartIntroduction
        title="THE RISE OF MAMMALS"
        highlightWord="MAMMALS"
        isVisible={showIntro}
        textColor="#FFFFFF"
        highlightColor="#361E1A"
        showTextStroke={false}
      />

      {/* Mammals */}
      <Mammal
        isVisible={showMammals}
        isInteractive={showMammals && !selectedMammal}
        onMammalClick={handleMammalClick}
      />

      {/* Mammal Info Box */}
      <AnimatePresence>
        {selectedMammal && (
          <MammalInfoBox 
            mammal={selectedMammal} 
            position="left"
          />
        )}
      </AnimatePresence>

      {/* Fun Fact Popup */}
      <AnimatePresence>
        {showFunFact && (
          <FunfactPopup
            text="Mammals adapt in many ways to survive."
            delay={1}
          />
        )}
      </AnimatePresence>

      {/* Next Part Button */}
      <AnimatePresence>
        {showMammals && showFunFact && (
          <NextPartButton onClick={onNext} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}