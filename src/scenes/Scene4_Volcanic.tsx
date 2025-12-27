import { motion } from "framer-motion"
import { Hero } from "../components/Hero"
import { DialogueBox } from "../components/DialogueBox"

interface Scene4Props {
  onNext: () => void
}

export const Scene4_Volcanic = ({ onNext }: Scene4Props) => {
  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Volcanic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Initial Assets/prehistoric_bg.png')" }}
      />


      {/* Dramatic Overlay */}
      <motion.div 
        className="absolute inset-0 bg-linear-to-b from-red-900/40 via-purple-900/30 to-black/50"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />


      {/* Lightning Flashes */}
      <motion.div 
        className="absolute inset-0 bg-white"
        animate={{ opacity: [0, 0, 0, 0.3, 0, 0, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.3, 0.31, 0.32, 0.33, 0.6, 1]
        }}
      />


      {/* Diego */}
      <Hero
        x="30%"
        y="40%"
        scale={1}
      />


      {/* Floating Particles/Ash */}
      {[...Array(30)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute w-1 h-1 bg-orange-300/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `100%`
          }}
          animate={{ 
            y: [-window.innerHeight, 0],
            x: [0, Math.random() * 50 - 25],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}


      <DialogueBox 
        lines={[
          "What the...!",
          "This place is WILD!",
          "Volcanoes, lightning... this must be ancient Earth!",
          "Let's explore deeper... maybe underwater?"
        ]}
        onComplete={onNext}
      />
    </motion.div>
  )
}