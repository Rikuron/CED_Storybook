import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hero } from '../components/general/Hero'
import { WindGusts } from '../components/general/WindGusts'
import { SpeechBubble } from '../components/general/SpeechBubble'
import { NarrationDialogue } from '../components/general/NarrationDialogue'
import { useResponsive } from '../hooks/useResponsive'

interface Scene6Props {
  onNext: () => void
}

export const Scene6_Temperature = ({ onNext }: Scene6Props) => {
  const [showWindGusts, setShowWindGusts] = useState(true)
  const [showDeeper, setShowDeeper] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const [showNarration1, setShowNarration1] = useState(false)
  const [showNarration2, setShowNarration2] = useState(false)
  const [showQuestionMark, setShowQuestionMark] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

  useEffect(() => {
    const deeperTimer = setTimeout(() => {
      setShowDeeper(true)
    }, 2000)

    const fadeOutDeeperTimer = setTimeout(() => {
      setShowDeeper(false)
    }, 6000)

    const stopTimer = setTimeout(() => {
      setIsStopped(true)
      setShowWindGusts(false)
    }, 7500)

    const narration1Timer = setTimeout(() => {
      setShowNarration1(true)
      setShowQuestionMark(true)
    }, 8500)

    return () => {
      clearTimeout(deeperTimer)
      clearTimeout(fadeOutDeeperTimer)
      clearTimeout(stopTimer)
      clearTimeout(narration1Timer)
    }
  }, [])

  const getDiegoPosition = () => {
    if (!isStopped) {
      // Flying position (center of screen with tilt)
      return {
        x: isMobile ? '35vw' : isTablet ? '40vw' : isTV ? '42vw' : '45vw',
        y: isMobile ? '35vh' : isTablet ? '40vh' : isTV ? '40vh' : '40vh',
        scale: isMobile ? 0.8 : isTablet ? 1.2 : isTV ? 6.0 : 1.5,
        rotate: 15
      }
    }
    // Stopped position (center, no tilt)
    return {
      x: isMobile ? '35vw' : isTablet ? '40vw' : isTV ? '42vw' : '45vw',
      y: isMobile ? '35vh' : isTablet ? '40vh' : isTV ? '40vh' : '40vh',
      scale: isMobile ? 0.8 : isTablet ? 1.2 : isTV ? 6.0 : 1.5,
      rotate: 0
    }
  }
  const handleNarration1Complete = () => {
    setTimeout(() => {
      setShowNarration1(false)
      setTimeout(() => {
        setShowNarration2(true)
      }, 500)
    }, 1500)
  }
  const handleNarration2Complete = () => {
    setTimeout(() => {
      setShowNarration2(false)
      // TODO: Add climate slider challenge or next scene logic
    }, 1500)
  }

  const diegoPos = getDiegoPosition()

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <img
        src="/Background/scene5_bg.png"
        alt="Forest background"
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
          y: isMobile ? '35vh' : '40vh',
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
          duration: isStopped ? 0.5 : 1.5,
          ease: 'easeInOut'
        }}
      />

      {/* Question Mark above Diego when stopped */}
      <AnimatePresence>
        {showQuestionMark && (
          <SpeechBubble  
            text="?"
            position={{
              left: isMobile ? '38vw' : isTablet ? '43vw' : isTV ? '45vw' : '56vw',
              top: isMobile ? '18vh' : isTablet ? '22vh' : isTV ? '22vh' : '28vh'
            }}
            tailPosition="bottom-left"
            variant="thought"
            delay={0}
            speed={50}
          />
        )}
      </AnimatePresence>

      {/* Deeper Understanding Section */}
      <AnimatePresence>
        {showDeeper && (
          <motion.div
            className="absolute bottom-8 left-8 z-40"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2
              className="font-helvetica-blk text-white"
              style={{
                fontSize: isMobile ? '1.5rem' : isTablet ? '2rem' : isTV ? '6rem' : '2.5rem',
                WebkitTextStroke: isMobile ? '0.5px #000' : isTV ? '2px #000' : '1.5px #000'
              }}
            >
              Deeper Understanding
            </h2>
            <p
              className="font-helvetica-blk text-white max-w-[45vw]"
              style={{
                fontSize: isMobile ? '0.75rem' : isTablet ? '1rem' : isTV ? '3rem' : '1.25rem',
                WebkitTextStroke: isMobile ? '0.3px #000' : isTV ? '1px #000' : '0.5px #000',
                maxWidth: isTV ? '60vw' : isMobile ? '70vw' : '45vw'
              }}
            >
              Adaptations can be physical traits or behaviors that help organisms get food, avoid predators, and survive environmental conditions
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Narration 1 */}
      <AnimatePresence>
        {showNarration1 && (
          <NarrationDialogue
            text="Suddenly, Diego felt the Earth shake. Climate changes occurred, food sources disappeared, and many organisms became extinct."
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
            text="However, some animals survived because they already had traits that helped them adapt. Evolution does not plan ahead—organisms survive because they are already suited to change."
            delay={300}
            speed={30}
            onComplete={handleNarration2Complete}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}