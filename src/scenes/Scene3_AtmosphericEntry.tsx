import { motion } from "framer-motion"
import { useEffect } from "react"
import { Hero } from "../components/Hero"
import { DialogueBox } from "../components/DialogueBox"

interface Scene3Props {
  onNext: () => void
}

export const Scene3_AtmosphericEntry = ({ onNext }: Scene3Props) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 4000)
    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Moving Clouds Background */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 3, ease: "easeIn" }}
      >
        <div 
          className="w-full h-[300%] bg-cover bg-center"
          style={{
            backgroundImage: "url('/Initial Assets/clouds.png')",
            backgroundSize: "cover"
          }}
        />
      </motion.div>


      {/* Orange/Red Atmospheric Glow */}
      <motion.div 
        className="absolute inset-0 bg-linear-to-b from-orange-500/30 via-red-500/20 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />


      {/* Diego with Shake */}
      <Hero
        x="50%"
        y="50%"
        scale={1.2}
        shake={true}
      />

      {/* Speed lines */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 bg-white/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 100}px`,
          }}
          animate={{
            y: [0, window.innerHeight],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 0.5,
          }}
        />
      ))}


      <DialogueBox 
        lines={[
          "Hold on tight!",
          "This is getting bumpy!"
        ]}
      />
    </motion.div>
  )
}