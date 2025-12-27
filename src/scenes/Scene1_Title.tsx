import { motion } from "framer-motion"

interface Scene1Props {
  onNext: () => void
}

export const Scene1_Title = ({ onNext }: Scene1Props) => {
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl md:text-9xl font-bold bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
            Evolution
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
            Chronicles
          </h2>
          <p className="text-2xl text-white/80 mt-6 font-light tracking-wider">
            A Journey Through Time
          </p>
        </motion.div>

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgb(139, 92, 246, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-12 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:from-purple-500 hover:to-blue-500 transition-all border-2 border-white/30"
        >
          🚀 Start Journey
        </motion.button>

        {/* Animated Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}