import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FloatingFish } from '../components/scene3/FloatingFish'
import { FloatingOrganisms } from '../components/scene3/FloatingOrganisms'
import { ShoreWaves } from '../components/scene4/ShoreWaves'
import { useResponsive } from '../hooks/useResponsive'

interface Scene10Props {
  onNext: () => void
}

export const Scene10_Montage = ({ onNext }: Scene10Props) => {
  // Phases
  const [showOrganisms, setShowOrganisms] = useState(false)
  const [showFish, setShowFish] = useState(false)
  const [showPhase2To3Transition, setShowPhase2To3Transition] = useState(false)
  const [showAmphibians, setShowAmphibians] = useState(false)
  const [showPhase3To4Transition, setShowPhase3To4Transition] = useState(false)
  const [showLandPhase, setShowLandPhase] = useState(false)
  const [currentLandSubPhase, setCurrentLandSubPhase] = useState<'dinosaurs' | 'mammals' | 'humans' | 'exit'>('dinosaurs')
  const [showSpaceEnding, setShowSpaceEnding] = useState(false)
  const [earthShrunk, setEarthShrunk] = useState(false)
  const { isMobile, isTablet, isTV } = useResponsive()

  // Montage sequence
  useEffect(() => {
    // Phase 1: Organisms rushing past from right to left
    const organismsTimer = setTimeout(() => setShowOrganisms(true), 500)
    
    // Phase 2: Fish rushing past from right to left
    const fishTimer = setTimeout(() => {
      setShowOrganisms(false)
      setShowFish(true)
    }, 4000)

    const to3TransitionTimer = setTimeout(() => setShowPhase2To3Transition(true), 7500)

    // Phase 3: Amphibians
    const amphibiansTimer = setTimeout(() => {
      setShowFish(false)
      setShowAmphibians(true)
      setShowPhase2To3Transition(false)
    }, 8000)

    const to4TransitionTimer = setTimeout(() => setShowPhase3To4Transition(true), 11000)

    // Phase 4: Land Phase (Dinosaurs -> Mammals -> Humans -> Exit)
    const landPhaseTimer = setTimeout(() => {
      setShowAmphibians(false)
      setShowPhase3To4Transition(false)
      setShowLandPhase(true)
      setCurrentLandSubPhase('dinosaurs')
    }, 11500)

    // Land Sub-phases
    const mammalsSubTimer = setTimeout(() => setCurrentLandSubPhase('mammals'), 15000)
    const humansSubTimer = setTimeout(() => setCurrentLandSubPhase('humans'), 18500)
    const exitSubTimer = setTimeout(() => setCurrentLandSubPhase('exit'), 22000)

    // Phase 5: Space ending
    const spaceEndingTimer = setTimeout(() => {
      setShowLandPhase(false)
      setShowSpaceEnding(true)
    }, 24000)

    // Earth shrinks to corner
    const earthShrinkTimer = setTimeout(() => {
      setEarthShrunk(true)
    }, 25000)

    // End scene - loops back to Scene1
    const endTimer = setTimeout(() => onNext(), 28000)

    return () => {
      clearTimeout(organismsTimer)
      clearTimeout(fishTimer)
      clearTimeout(to3TransitionTimer)
      clearTimeout(amphibiansTimer)
      clearTimeout(to4TransitionTimer)
      clearTimeout(landPhaseTimer)
      clearTimeout(mammalsSubTimer)
      clearTimeout(humansSubTimer)
      clearTimeout(exitSubTimer)
      clearTimeout(spaceEndingTimer)
      clearTimeout(earthShrinkTimer)
      clearTimeout(endTimer)
    }
  }, [onNext])

  const speedBeamHeight = isMobile ? '1px' : isTablet ? '2px' : isTV ? '5px' : '2px'
  const speedBeamWidth = isMobile ? '150px' : isTablet ? '200px' : isTV ? '500px' : '250px'

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Underwater Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: showFish
            ? 'linear-gradient(180deg, #1e3a5f 0%, #0a1628 50%, #0d2137 100%)'  // Lighter - Fish phase
            : 'linear-gradient(180deg, #0a1628 0%, #050d15 50%, #000000 100%)'   // Dark - Organisms phase
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Light rays from above */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          background: showFish
            ? 'linear-gradient(180deg, rgba(100, 180, 255, 0.25) 0%, transparent 50%)'
            : 'linear-gradient(180deg, rgba(50, 100, 150, 0.15) 0%, transparent 40%)',
          opacity: [0.4, 0.6, 0.4] 
        }}
        transition={{ 
          background: { duration: 1.5 },
          opacity: { duration: 3, repeat: Infinity }
        }}
      />

      {/* Speed beams - Always visible during montage */}
      {[
        { top: '8%', delay: 0.0 },
        { top: '45%', delay: 0.15 },
        { top: '22%', delay: 0.05 },
        { top: '78%', delay: 0.22 },
        { top: '55%', delay: 0.08 },
        { top: '12%', delay: 0.28 },
        { top: '88%', delay: 0.12 },
        { top: '35%', delay: 0.32 },
        { top: '62%', delay: 0.02 },
        { top: '5%', delay: 0.18 },
        { top: '72%', delay: 0.25 },
        { top: '28%', delay: 0.1 },
        { top: '92%', delay: 0.35 },
        { top: '48%', delay: 0.2 },
        { top: '15%', delay: 0.38 },
        { top: '82%', delay: 0.06 },
        { top: '38%', delay: 0.3 },
        { top: '68%', delay: 0.14 },
      ].slice(0, isMobile ? 10 : isTablet ? 14 : isTV ? 18 : 18).map((beam, i) => (
        <motion.div 
          key={`speedbeam-${i}`}
          className="absolute bg-linear-to-l from-white/50 to-transparent"
          style={{
            height: speedBeamHeight,
            width: speedBeamWidth,
            top: beam.top,
            right: `-${parseInt(speedBeamWidth)}px`
          }}
          animate={{ 
            x: [0, -window.innerWidth - 500],
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: 0.6,
            delay: beam.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Floating bubbles rushing past */}
      {[...Array(isMobile ? 10 : 20)].map((_, i) => (
        <motion.div 
          key={`bubble-${i}`}
          className="absolute rounded-full bg-blue-200/40"
          style={{ 
            width: `${8 + Math.random() * 15}px`,
            height: `${8 + Math.random() * 15}px`,
            top: `${Math.random() * 100}%`,
            right: '-50px'
          }}
          animate={{
            x: [0, -window.innerWidth - 100],
            opacity: [0, 0.7, 0.7, 0]
          }}
          transition={{
            duration: 1.5 + Math.random() * 0.5,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* PHASE 1: Organisms rushing past from right to left */}
      <AnimatePresence>
        {showOrganisms && (
          <FloatingOrganisms
            challengeMode={false}
            isTransitioning={false}
            hoveredOrganism={null}
            onHover={() => {}}
            onOrganismClick={() => {}}
            montageMode={true}
          />
        )}
      </AnimatePresence>

      {/* PHASE 2: Fish rushing past from right to left */}
      <FloatingFish 
        isVisible={showFish}
        montageMode={true}
      />

      {/* Transition overlay from Phase 2 to Phase 3 */}
      <AnimatePresence>
        {showPhase2To3Transition && (
          <motion.div
            className="absolute inset-0 z-50 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* PHASE 3: Amphibians emerging from water to shore */}
      <AnimatePresence>
        {showAmphibians && (
          <>
            {/* Shore background */}
            <ShoreWaves />
            
            {/* 3 Amphibians emerging from water and crawling to shore */}
            {[
              { bottom: '28%', left: '55%', delay: 0.0 },
              { bottom: '38%', left: '80%', delay: 0.3 },
              { bottom: '48%', left: '72%', delay: 0.7 },
            ].map((amphibian, i) => (
              <motion.img
                key={`amphibian-${i}`}
                src="/initial_assets/5_Tiktaalik.png"
                alt="Tiktaalik"
                className="absolute z-40"
                style={{
                  width: isMobile ? '18vw' : isTablet ? '20vw' : isTV ? '22vw' : '18vw',
                  bottom: amphibian.bottom,
                }}
                initial={{ 
                  left: amphibian.left,
                  x: -100,
                  opacity: 0 
                }}
                animate={{ 
                  left: amphibian.left,
                  x: isMobile ? 150 : 250,  // Move towards shore (right)
                  opacity: [0, 1, 1, 1]
                }}
                transition={{
                  x: {
                    duration: 2.5,
                    delay: amphibian.delay,
                    ease: "easeInOut"
                  },
                  opacity: {
                    duration: 0.5,
                    delay: amphibian.delay
                  }
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Transition overlay from Phase 3 to Phase 4 */}
      <AnimatePresence>
        {showPhase3To4Transition && (
          <motion.div
            className="absolute inset-0 z-50 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* PHASE 4: Land phase - Dinosaurs, Mammals, Humans */}
      <AnimatePresence>
        {showLandPhase && (
          <>
            {/* Grassland Background */}
            <motion.img
              src="/background/scene7_bg.png"
              alt="Grassland background"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Speed Beams (green-tinted for grass) */}
            {currentLandSubPhase !== 'exit' && [
              { top: '8%', delay: 0.0 },
              { top: '45%', delay: 0.15 },
              { top: '22%', delay: 0.05 },
              { top: '78%', delay: 0.22 },
              { top: '55%', delay: 0.08 },
              { top: '12%', delay: 0.28 },
              { top: '88%', delay: 0.12 },
              { top: '35%', delay: 0.32 },
              { top: '62%', delay: 0.02 },
              { top: '5%', delay: 0.18 },
              { top: '72%', delay: 0.25 },
              { top: '28%', delay: 0.1 },
              { top: '92%', delay: 0.35 },
              { top: '48%', delay: 0.2 },
              { top: '15%', delay: 0.38 },
              { top: '82%', delay: 0.06 },
              { top: '38%', delay: 0.3 },
              { top: '68%', delay: 0.14 },
            ].slice(0, isMobile ? 10 : isTablet ? 14 : isTV ? 18 : 18).map((beam, i) => (
              <motion.div 
                key={`grassbeam-${i}`}
                className="absolute bg-linear-to-l from-white/40 to-transparent z-30"
                style={{
                  height: speedBeamHeight,
                  width: speedBeamWidth,
                  top: beam.top,
                  right: `-${parseInt(speedBeamWidth)}px`
                }}
                animate={{ 
                  x: [0, -window.innerWidth - 500],
                  opacity: [0, 0.7, 0.7, 0]
                }}
                transition={{
                  duration: 0.6,
                  delay: beam.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}

            {/* Sub-phase: Dinosaurs */}
            {currentLandSubPhase === 'dinosaurs' && (
              <>
                {[
                  { bottom: '15%', delay: 0.0, size: '18vw' },
                  { bottom: '25%', delay: 0.4, size: '15vw' },
                  { bottom: '20%', delay: 0.8, size: '12vw' },
                ].map((dino, i) => (
                  <motion.img
                    key={`dino-${i}`}
                    src="/initial_assets/bigger_dinosaur.png"
                    alt="Dinosaur"
                    className="absolute z-40"
                    style={{
                      width: isMobile ? '12vw' : dino.size,
                      bottom: dino.bottom,
                      right: '-20vw'
                    }}
                    initial={{ left: '110%' }}
                    animate={{ 
                      left: '-30%',
                    }}
                    transition={{
                      left: { duration: 3, delay: dino.delay, ease: "linear" },
                    }}
                  />
                ))}
              </>
            )}

            {/* Sub-phase: Mammals */}
            {currentLandSubPhase === 'mammals' && (
              <>
                {[
                  { bottom: '18%', delay: 0.0 },
                  { bottom: '28%', delay: 0.3 },
                  { bottom: '22%', delay: 0.6 },
                ].map((mammal, i) => (
                  <motion.img
                    key={`mammal-${i}`}
                    src="/initial_assets/11_Mammal.png"
                    alt="Mammal"
                    className="absolute z-40"
                    style={{
                      width: isMobile ? '10vw' : isTablet ? '12vw' : '14vw',
                      bottom: mammal.bottom,
                    }}
                    initial={{ left: '110%' }}
                    animate={{ left: '-30%' }}
                    transition={{
                      left: { duration: 3, delay: mammal.delay, ease: "linear" },
                    }}
                  />
                ))}
              </>
            )}

            {/* Sub-phase: Humans (Neanderthals) */}
            {currentLandSubPhase === 'humans' && (
              <>
                {[
                  { bottom: '20%', delay: 0.0 },
                  { bottom: '30%', delay: 0.35 },
                  { bottom: '25%', delay: 0.7 },
                ].map((human, i) => (
                  <motion.img
                    key={`human-${i}`}
                    src="/initial_assets/12.4_Neanderthals.png"
                    alt="Neanderthal"
                    className="absolute z-40"
                    style={{
                      width: isMobile ? '8vw' : isTablet ? '10vw' : '12vw',
                      bottom: human.bottom,
                    }}
                    initial={{ left: '110%' }}
                    animate={{ left: '-30%' }}
                    transition={{
                      left: { duration: 3, delay: human.delay, ease: "linear" },
                    }}
                  />
                ))}
              </>
            )}

            {/* Sub-phase: Exit to clouds */}
            {currentLandSubPhase === 'exit' && (
              <>
                {/* Sky transition */}
                <motion.div 
                  className="absolute inset-0 z-40 pointer-events-none bg-linear-to-b from-blue-300 via-blue-100 to-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                
                {/* Clouds rushing down (we're going up!) */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`exitcloud-${i}`}
                    className="absolute z-50 pointer-events-none"
                    style={{
                      width: '200%',
                      height: '60%',
                      top: `${-50 + i * 20}%`,
                      left: '-50%',
                      background: 'url("/initial_assets/clouds.png")',
                      backgroundSize: 'cover',
                      filter: `blur(${2 + i}px)`,
                      opacity: 0.7 - i * 0.1,
                    }}
                    initial={{ y: '-100vh' }}
                    animate={{ y: '100vh' }}
                    transition={{ 
                      duration: 2 - i * 0.2, 
                      delay: i * 0.1,
                      ease: "easeIn" 
                    }}
                  />
                ))}
                
                {/* White flash */}
                <motion.div 
                  className="absolute inset-0 z-60 bg-white pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, ease: "easeIn" }}
                />
              </>
            )}
          </>
        )}
      </AnimatePresence>

      {/* PHASE 5: Space ending - Earth shrinks to Scene1 initial position */}
      <AnimatePresence>
        {showSpaceEnding && (
          <>
            {/* Space Background */}
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/background/space_bg.png')" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Background Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/30 to-black/60" />

            {/* Rotating Earth - starts large, shrinks to Scene1 initial position */}
            <motion.div 
              className="absolute z-20"
              style={{
                right: isMobile ? '-10vw' : isTablet ? '-7vw' : isTV ? '-10vw' : '-14vw',
                bottom: isMobile ? '-25vh' : isTablet ? '-65vh' : isTV ? '-65vh' : '-60vh',
              }}
              initial={{ scale: 3, opacity: 0 }}
              animate={{ 
                scale: earthShrunk ? 1 : 2,
                opacity: 1
              }}
              transition={{ duration: 2, ease: "easeOut" }}
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
                  filter: 'drop-shadow(0 0 80px rgba(59, 130, 246, 0.6))'
                }}
                transition={{
                  rotate: {
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}