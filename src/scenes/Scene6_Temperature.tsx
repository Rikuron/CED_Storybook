import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Hero } from '../components/general/Hero'
import { WindGusts } from '../components/general/WindGusts'
import { SpeechBubble } from '../components/general/SpeechBubble'
import { NarrationDialogue } from '../components/general/NarrationDialogue'
import { Prompt } from '../components/general/Prompt'
import { ClimateSlider } from '../components/scene6/ClimateSlider'
import { NextPartButton } from '../components/general/NextPartButton'
import { useResponsive } from '../hooks/useResponsive'

type ClimateLevel = | 'cold' | 'middle' | 'hot' | 'perfect'

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
  const [showClimateChallenge, setShowClimateChallenge] = useState(false)
  const [climateLevel, setClimateLevel] = useState<ClimateLevel>('middle')
  const [showDiegoReaction, setShowDiegoReaction] = useState(false)
  const [showThinkAboutIt, setShowThinkAboutIt] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
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

  useEffect(() => {
    if (!showClimateChallenge) return

    const sequence = async () => {
      // Start at middle, then go cold
      await new Promise(r => setTimeout(r, 1500))
      setClimateLevel('cold')
      setShowDiegoReaction(true)

      // Wait, then go bot
      await new Promise(r => setTimeout(r, 3000))
      setShowDiegoReaction(false)
      await new Promise(r => setTimeout(r, 500))
      setClimateLevel('hot')
      setShowDiegoReaction(true)

      // Wait, then go perfect
      await new Promise(r => setTimeout(r, 3000))
      setShowDiegoReaction(false)
      await new Promise(r => setTimeout(r, 500))
      setClimateLevel('perfect')
      setShowDiegoReaction(true)

      // Think About It section
      await new Promise(r => setTimeout(r, 2000))
      setShowThinkAboutIt(true)
      setShowNextButton(true)
    }

    sequence()
  }, [showClimateChallenge])

  const getBackgroundImage = () => {
    switch (climateLevel) {
      case 'cold': return '/background/8_Part5Cold.png'
      case 'hot': return '/background/9_Part5Hot.png'
      case 'perfect': return '/background/10_Part5Grass.png'
      default: return '/background/scene5_bg.png'
    }
  }

  const getDiegoReactionText = () => {
    switch (climateLevel) {
      case 'cold' : return "This is too cold!"
      case 'hot': return "This is too hot!"
      case 'perfect': return "Just right!"
      default: return ""
    }
  }

  const getDiegoPosition = () => {
    if (!isStopped) {
      // Flying position (center of screen with tilt)
      return {
        x: isMobile ? '35vw' : isTablet ? '40vw' : isTV ? '42vw' : '45vw',
        y: isMobile ? '35vh' : isTablet ? '40vh' : isTV ? '40vh' : '40vh',
        scale: isMobile ? 0.8 : isTablet ? 1.0 : isTV ? 6.0 : 1.5,
        rotate: 15
      }
    }

    // Stopped position (center, no tilt)
    return {
      x: isMobile ? '35vw' : isTablet ? '35vw' : isTV ? '42vw' : '32.5vw',
      y: isMobile ? '35vh' : isTablet ? '35vh' : isTV ? '40vh' : '40vh',
      scale: isMobile ? 0.8 : isTablet ? 1.0 : isTV ? 6.0 : 1.5,
      rotate: 0
    }
  }

  const handleNarration1Complete = () => {
    setTimeout(() => {
      setShowNarration1(false)
      setShowQuestionMark(false)
      setTimeout(() => {
        setShowNarration2(true)
      }, 500)
    }, 1500)
  }

  const handleNarration2Complete = () => {
    setTimeout(() => {
      setShowNarration2(false)
      setTimeout(() => setShowClimateChallenge(true), 500)
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
      <AnimatePresence mode="wait">
        <motion.img 
          key={getBackgroundImage()}
          src={getBackgroundImage()}
          alt="Scene Background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

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
              left: isMobile ? '38vw' : isTablet ? '47vw' : isTV ? '52.5vw' : '45vw',
              top: isMobile ? '18vh' : isTablet ? '22vh' : isTV ? '20vh' : '28vh'
            }}
            tailPosition="bottom-left"
            variant="thought"
            delay={0}
            speed={50}
          />
        )}
      </AnimatePresence>

      {/* Diego's Climate Reactions */}
      <AnimatePresence>
        {showDiegoReaction && showClimateChallenge && (
          <SpeechBubble  
            text={getDiegoReactionText()}
            position={{
              left: isMobile ? '20vw' : isTablet ? '22vw' : isTV ? '23vw' : '22vw',
              top: isMobile ? '22vh' : isTablet ? '26vh' : isTV ? '20vh' : '30vh'
            }}
            tailPosition="bottom-right"
            variant={climateLevel === 'perfect' ? 'normal' : 'shout'}
            delay={0}
            speed={40}
          />
        )}
      </AnimatePresence>

      {/* Deeper Understanding Section */}
      <Prompt
        title="Deeper Understanding"
        subtitle="Adaptations can be physical traits or behaviors that help organisms get food, avoid predators, and survive environmental conditions"
        titleColor="#FFFFFF"
        isVisible={showDeeper}
      />

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

      {/* Choose the Perfect Climate Section */}
      <Prompt
        title="Choose the Perfect Climate"
        subtitle="Interact with the Climate Slider"
        titleColor="#FFFFFF"
        isVisible={showClimateChallenge && !showThinkAboutIt}
      />

      {/* Think About It Section */}
      <Prompt
        title="Think About It"
        subtitle="What traits help animals survive today?"
        titleColor="#FFFFFF"
        isVisible={showThinkAboutIt}
      />

      {/* Climate Slider */}
      <ClimateSlider
        isVisible={showClimateChallenge}
        currentLevel={climateLevel === 'perfect' ? 'middle' : climateLevel}
      />

      {/* Next Part Button */}
      <NextPartButton 
        onClick={onNext} 
        isVisible={showNextButton}  
      />
    </motion.div>
  )
}