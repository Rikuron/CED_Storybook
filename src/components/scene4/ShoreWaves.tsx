import { motion } from 'framer-motion'

interface ShoreWavesProps {
  backgroundColor?: string
}

export const ShoreWaves =({
  backgroundColor = "#2B4B6F"
}: ShoreWavesProps) => {
  const waveAnimationConfig = {
    inner: { 
      x: ["0%", "20%", "0%"], 
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" as const, 
        delay: 0.6 
      } 
    },
    middle: { 
      x: ["-3%", "8%", "-3%"], 
      transition: { 
        duration: 3.5, 
        repeat: Infinity, 
        ease: "easeInOut" as const, 
        delay: 0.3 
      } 
    },
    outer: { 
      x: ["-5%", "7%", "-5%"], 
      transition: { 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" as const 
      } 
    }
  }
  return (
    <>
      {/* Background */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{ backgroundColor }} 
      />

      {/* Shore Background */}
      <img 
        src="/initial_assets/shore_land.png" 
        alt="Shore background" 
        className="absolute inset-0 w-full h-full" 
      />
      
      {/* Inner Wave */}
      <motion.img 
        src="/initial_assets/inner_wave.png" 
        alt="Inner wave" 
        className="absolute object-cover pointer-events-none z-0"
        style={{ left: "-20%", top: 0, width: "50%", height: "100%" }} 
        animate={waveAnimationConfig.inner} 
      />
      
      {/* Middle Wave */}
      <motion.img 
        src="/initial_assets/middle_wave.png" 
        alt="Middle wave" 
        className="absolute object-cover pointer-events-none z-5"
        style={{ left: "-10%", top: 0, width: "65%", height: "100%" }} 
        animate={waveAnimationConfig.middle} 
      />

      {/* Outer Wave */}
      <motion.img 
        src="/initial_assets/outer_wave.png" 
        alt="Outer wave" 
        className="absolute object-cover pointer-events-none z-10"
        style={{ left: "6.5%", top: 0, width: "70%", height: "100%" }} 
        animate={waveAnimationConfig.outer} 
      />
    </>
  )
}