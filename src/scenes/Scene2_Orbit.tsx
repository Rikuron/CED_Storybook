import { motion } from "framer-motion"
import { useState } from "react"
import { Hero } from "../components/Hero"
import { DialogueBox } from "../components/DialogueBox"

interface Scene2Props {
  onNext: () => void
}

export const Scene2_Orbit = ({ onNext }: Scene2Props) => {
  const [earthClicked, setEarthClicked] = useState(false)

  const handleEarthClick = () => {
    if (!earthClicked) {
      setEarthClicked(true)
      setTimeout(onNext, 2000)
    }
  }

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Space Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Initial Assets/space_bg.png')" }}
      />


      {/* Earth */}
      <motion.div
        className="absolute cursor-pointer"
        style={{ left: "60%", top: "50%", translateX: "-50%", translateY: "-50%" }}
        animate={earthClicked ? { scale: 20, opacity: 0 } : { scale: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        onClick={handleEarthClick}
        whileHover={!earthClicked ? { scale: 1.1 } : {}}
      >
        <motion.img 
          src="/Initial Assets/earth.png"
          alt="Earth"
          className="w-64 h-64 object-contain drop-shadow-2xl"
          animate={{
            rotate: 360,
            filter: earthClicked ? ["drop-shadow(0 0 100px rgba(59, 130, 246, 0.8))"] : "drop-shadow(0 0 50px rgba(59, 130, 246, 0.5))"
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            filter: { duration: 0.5 }
          }}
        />
      </motion.div>


      {/* Diego */}
      <Hero
        x="20%"
        y="50%"
        scale={1}
      />


      {/* Dialogue */}
      {!earthClicked && (
        <DialogueBox 
          lines={[
            "Whoa! What a beautiful planet!",
            "I wonder what secrets it holds...",
            "Let's take a closer look! Click on Earth!",
          ]}
        />
      )}
    </motion.div>
  )
}