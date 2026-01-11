import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { NarrationDialogue } from "../components/general/NarrationDialogue"
import { TitleSceneContent } from "../components/scene1/TitleSceneContent"
import { InteractiveHint } from "../components/scene1/InteractiveHint"
import { Hero } from "../components/general/Hero"
import { useResponsive } from "../hooks/useResponsive"

interface Scene1Props {
  onNext: () => void
}

export const Scene1_Title = ({ onNext }: Scene1Props) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showDiego, setShowDiego] = useState(false)
  const [dialogueComplete, setDialogueComplete] = useState(false)
  const [enteringEarth, setEnteringEarth] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

  const handleEarthClick = () => {
    setIsClicked(true)

    setTimeout(() => {
      setShowDiego(true)
    }, 1500)
  }

  const handleEnterEarth = () => {
    if (!dialogueComplete) return

    setEnteringEarth(true)
    setTimeout(() => {
      onNext()
    }, 2500)
  }

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Background/space_bg.png')" }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/30 to-black/60" />

      {/* Rotating Earth */}
      <motion.div 
        className={`absolute ${!isClicked ? 'cursor-pointer' : (dialogueComplete ? 'cursor-pointer' : '')} z-20`}
        initial={{
          right: isMobile ? '-10vw' : isTablet ? '-7vw' : isTV ? '-10vw' : '-14vw',
          bottom: isMobile ? '-25vh' : isTablet ? '-65vh' : isTV ? '-65vh' : '-60vh',
          x: 0,
          y: 0
        }}
        animate={enteringEarth ? {
          right: '50%',
          bottom: '50%',
          x: '50%',
          y: '50%',
          scale: isMobile ? 6 : isTablet ? 4 : isTV ? 4 : 4,
          opacity: 0
        } : isClicked ? {
          right: '50%',
          bottom: '50%',
          x: '50%',
          y: '50%',
          scale: isMobile ? 0.35 : 0.5
        } : {
          right: isMobile ? '-10vw' : isTablet ? '-7vw' : isTV ? '-10vw' : '-14vw',
          bottom: isMobile ? '-25vh' : isTablet ? '-65vh' : isTV ? '-65vh' : '-60vh',
          x: 0,
          y: 0
        }}
        transition={{ duration: enteringEarth ? 2 : 1.2, ease: "easeInOut" }}
        onClick={
          !isClicked ? handleEarthClick 
          : (dialogueComplete ? handleEnterEarth : undefined)
        }
        onHoverStart={() => (!isClicked || dialogueComplete) && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.img 
          src="/Initial Assets/alt_earth.png" 
          alt="Earth" 
          className=" object-contain will-change-transform"
          style={{ 
            width: '120vh',  
            height: '120vh',
            transformOrigin: 'center center' 
          }}
          animate={{ 
            rotate: 360,
            filter: isHovered ? 'drop-shadow(0 0 100px rgba(255, 255, 255, 0.8))' : 'drop-shadow(0 0 80px rgba(59, 130, 246, 0.6))'
          }}
          transition={{
            rotate: {
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            },
            filter: {
              duration: 0.3
            }
          }}
        />

        {/* Interactive Hint Text */}
        <InteractiveHint 
          text="Click to Begin"
          isVisible={!isClicked}
        />
      </motion.div>


      {/* Content */}
      <TitleSceneContent isVisible={!isClicked} />


      {/* Hero Character - Diego */}
      <AnimatePresence>
        {showDiego && (
          <Hero 
            x="-10vw"
            y="-10vh"
            scale={isMobile ? 0.5 : isTablet ? 0.8 : isTV ? 4.5 : 1.25}
            animate={enteringEarth ? {
              x: "45vw",
              y: "45vh",
              scale: isMobile ? 2 : isTV ? 4 : 3,
              opacity: 1
            } : {
              x: isMobile ? "5vw" : "15vw",
              y: isMobile ? "45vh" : "40vh",
              scale: isMobile ? 0.5 : isTablet ? 0.8 : isTV ? 4.5 : 1.25,
              opacity: 1
            }}
            transition={{
              duration: enteringEarth ? 1.5 : 1.2,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>

      
      {/* Diego Introduction Dialogue */}
      <AnimatePresence>
        {showDiego && !enteringEarth && (
          <NarrationDialogue
            text="Meet Diego, a curious time traveler who wants to understand how life on Earth changed through millions of years. Together with Diego, you will travel through time and discover how simple life forms transformed into the diverse organisms we see today."
            delay={1500}
            speed={25}
            onComplete={() => setDialogueComplete(true)}
          />
        )}
      </AnimatePresence>


      {/* Atmosphere Entry Overlay */}
      <AnimatePresence>
        {enteringEarth && (
          <>
            {/* Sky background */}
            <motion.div 
              className="absolute inset-0 z-30 pointer-events-none bg-linear-to-b from-blue-300 via-blue-100 to-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            
            {/* Multiple cloud layers rushing past */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-40 pointer-events-none"
                style={{
                  width: '200%',
                  height: '60%',
                  top: `${10 + i * 15}%`,
                  left: '-50%',
                  background: 'url("/Initial Assets/clouds.png")',
                  backgroundSize: 'cover',
                  filter: `blur(${2 + i}px)`,
                  opacity: 0.7 - i * 0.1,
                }}
                initial={{ 
                  x: i % 2 === 0 ? '-30%' : '30%', 
                  y: '100vh',
                  scale: 1 + i * 0.2
                }}
                animate={{ 
                  x: i % 2 === 0 ? '30%' : '-30%', 
                  y: '-100vh',
                  scale: 1.5 + i * 0.2
                }}
                transition={{ 
                  duration: 2 - i * 0.2, 
                  delay: i * 0.15,
                  ease: "easeIn" 
                }}
              />
            ))}
            
            {/* White flash at the end */}
            <motion.div 
              className="absolute inset-0 z-50 bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5, ease: "easeIn" }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}