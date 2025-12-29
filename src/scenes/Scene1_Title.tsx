import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { TypeWriter } from "../components/TypeWriter"

interface Scene1Props {
  onNext: () => void
}

export const Scene1_Title = ({ onNext }: Scene1Props) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleEarthClick = () => {
    setIsClicked(true)

    setTimeout(() => {
      onNext()
    }, 1500)
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
        className="absolute cursor-pointer z-20"
        initial={{
          right: '-192px',
          bottom: '-448px',
          x: 0,
          y: 0
        }}
        animate={isClicked ? {
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
        transition={{ duration: 1.2, ease: "easeInOut" }}
        onClick={handleEarthClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.img 
          src="/Initial Assets/alt_earth.png" 
          alt="Earth" 
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[850px] lg:h-[850px] object-contain"
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

      {/* Animated Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ 
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </motion.div>
  )
}