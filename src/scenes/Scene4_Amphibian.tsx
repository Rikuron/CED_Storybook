import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hero } from '../components/general/Hero'
import { PartIntroduction } from '../components/general/PartIntroduction'
import { ShoreWaves } from '../components/scene4/ShoreWaves'
import { SplashEffect } from '../components/scene4/SplashEffect'

import { useResponsive } from '../hooks/useResponsive'

interface Scene4Props {
  onNext: () => void
}

export const Scene4_Amphibian = ({ onNext }: Scene4Props) => {
  const [showIntro, setShowIntro] = useState(true)
  const [diegoEntered, setDiegoEntered] = useState(false)
  const [showSplash, setShowSplash] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

  useEffect(() => {
    const introTimer = setTimeout(() => setShowIntro(false), 4000)

    const splashTimer = setTimeout(() => setShowSplash(true), 4500)
    const splashEndTimer = setTimeout(() => setShowSplash(false), 5500)

    const diegoTimer = setTimeout(() => setDiegoEntered(true), 5500)

    return () => {
      clearTimeout(introTimer)
      clearTimeout(splashTimer)
      clearTimeout(splashEndTimer)
      clearTimeout(diegoTimer)
    }
  }, [])

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
            scale={isMobile ? 0.6 : isTablet ? 1.0 : isTV ? 4.0 : 1.5}
            initial={{
              x: isMobile ? "10vw" : "20vw",
              y: isMobile ? "40vh" : "35vh",
              scale: isMobile ? 0.4 : isTablet ? 0.8 : isTV ? 3.0 : 1.0,
              opacity: 0
            }}
            animate={{
              x: isMobile ? "10vw" : "20vw",
              y: isMobile ? "35vh" : "30vh",
              scale: isMobile ? 0.6 : isTablet ? 1.0 : isTV ? 4.0 : 1.5,
              opacity: 1
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}