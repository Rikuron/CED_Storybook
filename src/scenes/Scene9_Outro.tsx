import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hero } from '../components/general/Hero'
import { NarrationDialogue } from '../components/general/NarrationDialogue'

import { useResponsive } from '../hooks/useResponsive'

interface Scene9Props {
  onNext: () => void
}

export const Scene9_Outro = ({ onNext }: Scene9Props) => {
  const [showDiego, setShowDiego] = useState(false)
  const [showNarration1, setShowNarration1] = useState(false)
  const [showNarration2, setShowNarration2] = useState(false)
  const [showNarration3, setShowNarration3] = useState(false)
  const [diegoFlyingOff, setDiegoFlyingOff] = useState(false)
  const [earthZoomed, setEarthZoomed] = useState(false)
  const [showEarthText, setShowEarthText] = useState(false)
  const [earthClickable, setEarthClickable] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [enteringEarth, setEnteringEarth] = useState(false)

  const { isMobile, isTablet, isTV } = useResponsive()

  useEffect(() => {
    const diegoTimer = setTimeout(() => {
      setShowDiego(true)
    }, 1000)

    const narration1Timer = setTimeout(() => {
      setShowNarration1(true)
    }, 2000)

    return () => {
      clearTimeout(diegoTimer)
      clearTimeout(narration1Timer)
    }
  }, [])

  const handleNarration1Complete = () => {
    setTimeout(() => {
      setShowNarration1(false)
      setTimeout(() => setShowNarration2(true), 500)
    }, 1000)
  }

  const handleNarration2Complete = () => {
    setTimeout(() => {
      setShowNarration2(false)
      setTimeout(() => {
        setShowNarration3(true)
        setDiegoFlyingOff(true)
      }, 500)
    }, 1000)
  }

  const handleNarration3Complete = () => {
    setTimeout(() => {
      setShowNarration3(false)
      setShowDiego(false) // Diego is gone
      
      // Earth grows
      setTimeout(() => {
        setEarthZoomed(true)
        
        // Title appears
        setTimeout(() => {
          setShowEarthText(true)
          
          // Title fades, Earth becomes clickable
          setTimeout(() => {
            setShowEarthText(false)
            setTimeout(() => setEarthClickable(true), 800)
          }, 4000)
        }, 1000)
      }, 500)
    }, 1000)
  }

  // Earth click handler
  const handleEarthClick = () => {
    if (!earthClickable) return
    
    setEnteringEarth(true)
    setTimeout(() => {
      onNext()
    }, 2500)
  }

  // Diego position based on state
  const getDiegoPosition = () => {
    if (diegoFlyingOff) {
      return {
        x: '-30vw',
        y: '-30vh',
        scale: isMobile ? 0.3 : isTablet ? 0.6 : isTV ? 3.0 : 0.8,
        opacity: 0
      }
    }
    
    // Positioned to the left of Earth
    return {
      x: isMobile ? '5vw' : isTablet ? '15vw' : isTV ? '20vw' : '15vw',
      y: isMobile ? '35vh' : isTablet ? '30vh' : isTV ? '42vh' : '40vh',
      scale: isMobile ? 0.5 : isTablet ? 0.8 : isTV ? 4.5 : 1.25,
      opacity: 1
    }
  }
  
  const diegoPos = getDiegoPosition()
  
  // Earth scale based on state
  const getEarthScale = () => {
    if (enteringEarth) {
      return isMobile ? 6 : isTablet ? 5 : isTV ? 5 : 5
    }
    if (earthZoomed) {
      return isMobile ? 0.45 : 0.8
    }
    return isMobile ? 0.35 : 0.5
  }

  // Text styling
  const titleFontSize = isMobile ? '1.25rem' : isTablet ? '1.75rem' : isTV ? '10rem' : '2.5rem'
  const titleStroke = isMobile ? '0.5px' : isTablet ? '1px' : isTV ? '3px' : '1.5px'

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
        style={{ backgroundImage: "url('/background/space_bg.png')" }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/30 to-black/60" />
      
      {/* Rotating Earth */}
      <motion.div 
        className={`absolute ${earthClickable ? 'cursor-pointer' : ''} z-20`}
        style={{
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%'
        }}
        animate={{
          scale: getEarthScale(),
          opacity: enteringEarth ? 0 : 1
        }}
        transition={{ 
          duration: enteringEarth ? 2 : 1.2, 
          ease: "easeInOut" 
        }}
        onClick={handleEarthClick}
        onHoverStart={() => earthClickable && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.img 
          src="/initial_assets/1_Earth.png" 
          alt="Earth" 
          className="object-contain will-change-transform"
          style={{ 
            width: '120vh',  
            height: '120vh',
            transformOrigin: 'center center' 
          }}
          animate={{ 
            rotate: 360,
            scale: isHovered && earthClickable ? 1.1 : 1,
            filter: earthClickable 
              ? 'drop-shadow(0 0 100px rgba(255, 255, 255, 0.8))' 
              : 'drop-shadow(0 0 80px rgba(59, 130, 246, 0.6))'
          }}
          transition={{
            rotate: {
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 0.2,
              ease: "easeOut"
            },
            filter: {
              duration: 0.5
            }
          }}
        />
      </motion.div>

      {/* Diego - Hero */}
      <AnimatePresence>
        {showDiego && (
          <Hero 
            initial={{
              x: '30vw',
              y: isMobile ? '45vh' : '50vh',
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: diegoPos.x,
              y: diegoPos.y,
              scale: diegoPos.scale,
              opacity: diegoPos.opacity
            }}
            transition={{
              duration: diegoFlyingOff ? 2 : 1.5,
              ease: 'easeInOut'
            }}
          />
        )}
      </AnimatePresence>

      {/* Narration 1 */}
      <AnimatePresence>
        {showNarration1 && (
          <NarrationDialogue
            text="Diego returned to the present and realized that evolution never truly ends."
            delay={500}
            speed={30}
            onComplete={handleNarration1Complete}
          />
        )}
      </AnimatePresence>

      {/* Narration 2 */}
      <AnimatePresence>
        {showNarration2 && (
          <NarrationDialogue
            text="Organisms today continue to adapt due to environmental changes, technology, and human activities."
            delay={500}
            speed={30}
            onComplete={handleNarration2Complete}
          />
        )}
      </AnimatePresence>

      {/* Narration 3 */}
      <AnimatePresence>
        {showNarration3 && (
          <NarrationDialogue
            text="Evolution connects all living things through a shared history of change."
            delay={500}
            speed={30}
            onComplete={handleNarration3Complete}
          />
        )}
      </AnimatePresence>

      {/* Centered Title Text */}
      <AnimatePresence>
        {showEarthText && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-center font-helvetica-blk text-white px-8 max-w-3/4"
              style={{ 
                fontSize: titleFontSize,
                WebkitTextStroke: `${titleStroke} #000`,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Evolution is not just the past—it is happening now!
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmosphere Entry Overlay (same as Scene1) */}
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
                  background: 'url("/initial_assets/clouds.png")',
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