import { motion } from 'framer-motion'
import { useState } from 'react'
import { Hero } from '../components/Hero'
import { DialogueBox } from '../components/DialogueBox'

interface Scene5Props {
  onNext: () => void
}

export const Scene5_Dive = ({ onNext }: Scene5Props) => {
  const [isDiving, setIsDiving] = useState(false)

  const handleDiveClick = () => {
    if (!isDiving) {
      setIsDiving(true)
      setTimeout(onNext, 3000)
    }
  }

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Split View Background */}
      <motion.div
        className="absolute inset-0"
        animate={isDiving ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        {/* Sky */}
        <div className="absolute inset-0 top-0 h-1/2 bg-linear-to-b from-sky-400 to-sky-200" />

        {/* Water */}
        <div 
          className="absolute inset-0 top-1/2 h-1/2 bg-cover bg-center" 
          style={{ backgroundImage: "url('/Initial Assets/sea.png')" }}
        />

        {/* Water Surface Line */}
        <motion.div 
          className="absolute left-0 right-0 h-2 bg-white/40"
          style={{ top: "50%" }}
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Glowing Hotspot */}
        {!isDiving && (
          <motion.div
            className="absolute cursor-pointer"
            style={{ left: "50%", top: "65%", translateX: "-50%", translateY: "-50%" }}
            onClick={handleDiveClick}
            whileHover={{ scale: 1.2 }}
          >
            <motion.div 
              className="w-24 h-24 rounded-full bg-radial from-cyan-300 to-blue-600"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                  "0 0 60px rgba(34, 211, 238, 0.9)",
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                ],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div> 
        )}
      </motion.div>

      {/* Diego */}
      <Hero 
        x="25%"
        y="30%"
        scale={0.9}
      />

      {/* Dialogue */}
      {!isDiving && (
        <DialogueBox 
          lines={[
            "The ocean! The birthplace of life itself.",
            "Let's dive in and see what we can find!",
            "Click the glowing spot to dive!",            
          ]}
        />
      )}
    </motion.div>
  )
}