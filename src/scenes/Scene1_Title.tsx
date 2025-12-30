import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { TypeWriter } from "../components/TypeWriter"
import { Hero } from "../components/Hero"

interface Scene1Props {
  onNext: () => void
}

export const Scene1_Title = ({ onNext }: Scene1Props) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showDiego, setShowDiego] = useState(false)
  const [dialogueComplete, setDialogueComplete] = useState(false)
  const [enteringEarth, setEnteringEarth] = useState(false)

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
        style={{ backgroundImage: "url('/Initial Assets/space_bg.png')" }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/30 to-black/60" />

      {/* Rotating Earth */}
      <motion.div 
        className={`absolute ${!isClicked ? 'cursor-pointer' : (dialogueComplete ? 'cursor-pointer' : '')} z-20`}
        initial={{
          right: '-192px',
          bottom: '-448px',
          x: 0,
          y: 0
        }}
        animate={enteringEarth ? {
          right: '50%',
          bottom: '50%',
          x: '50%',
          y: '50%',
          scale: 4,
          opacity: 0
        } : isClicked ? {
          right: '50%',
          bottom: '50%',
          x: '50%',
          y: '50%',
          scale: 0.5
        } : {
          right: '-192px',
          bottom: '-448px',
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
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[850px] lg:h-[850px] object-contain will-change-transform"
          style={{ transformOrigin: 'center center' }}
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
        <AnimatePresence>
          {!isClicked && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: '27.5%',
                left: '45%',
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.3, delay: 0 }
              }}
              transition={{ 
                delay: 5, duration: 0.5 
              }}
            >
              <motion.span
                className="text-yellow-300 text-2xl md:text-5xl font-canva-sans-bold text-center px-4"
                style={{ 
                  WebkitTextStroke: '2px #000000',
                }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Click to Begin
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>


      {/* Content */}
      <AnimatePresence>
        {!isClicked && (
          <motion.div
            className="relative z-10 flex flex-col items-start justify-start h-full"
            style={{ padding: '5rem 4rem' }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-y-1.5 text-left"
            >
              {/* Main Title */}
              <h1 className="text-2xl md:text-4xl mb-2">
                <TypeWriter 
                  text="Evolution Chronicles:"
                  delay={500}
                  speed={50}
                  className="text-white font-helvetica-regular drop-shadow-2xl"
                />
              </h1>

              {/* Subtitle */}
              <h2 className="text-3xl md:text-6xl font-helvetica-bold mt-4">
                <TypeWriter 
                  text="A "
                  delay={2500}
                  speed={60}
                  className="text-white drop-shadow-2xl"
                />
                <TypeWriter 
                  text="JOURNEY"
                  delay={2620}
                  speed={60}
                  className="text-pink-400 drop-shadow-2xl"
                />
                <TypeWriter 
                  text=" THROUGH TIME"
                  delay={3200}
                  speed={60}
                  className="text-white drop-shadow-2xl"
                />
              </h2>

              {/* Tagline */}
              <p className="text-xl md:text-2xl mt-8">
                <TypeWriter 
                  text="A Story of Life's Transformation Through Time"
                  delay={4500}
                  speed={40}
                  className="text-white font-nexa tracking-wider"
                />
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* Hero Character - Diego */}
      <AnimatePresence>
        {showDiego && (
          <Hero 
            x="-10vw"
            y="-10vh"
            scale={2}
            animate={enteringEarth ? {
              x: "45vw",
              y: "45vh",
              scale: 3,
              opacity: 1
            } : {
              x: "15vw",
              y: "40vh",
              scale: 2,
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
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl lg:text-2xl text-center">
              <TypeWriter
                text="Meet Diego, a curious time traveler who wants to understand how life on Earth changed through millions of years. Together with Diego, you will travel through time and discover how simple life forms transformed into the diverse organisms we see today."
                delay={1500}
                speed={25}
                className="text-white font-canva-sans-regular"
                onComplete={() => setDialogueComplete(true)}
              />
            </p>
          </motion.div>
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