import { motion } from "framer-motion"
import { type UnicellInfo, formatOrigin } from "../data/unicellInfo"

interface OrganismInfoBoxProps {
  organism: UnicellInfo
  position: {
    x: string
    y: string
  }
}

export const OrganismInfoBox = ({ organism, position }: OrganismInfoBoxProps) => {
  const xValue = parseInt(position.x)
  const yValue = parseInt(position.y)
  const showOnLeft = xValue > 65
  const showAbove = yValue > 60

  return (
    <motion.div
      className="absolute w-72 z-100"
      style={{
        top: showAbove ? undefined : position.y,
        bottom: showAbove ? `calc(100% - ${position.y} + 40px)` : undefined,
        left: showOnLeft ? undefined : `calc(${position.x} + 80px)`,
        right: showOnLeft ? `calc(100% - ${position.x} + 80px)` : undefined
      }}
      initial={{ opacity: 0, x: showOnLeft ? 10 : -10, y: showAbove ? 10 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: showOnLeft ? 10 : -10, y: showAbove ? 10 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="bg-slate-900/95 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-xl"
        style={{ padding: '0.5rem' }}
      >
        <h3 className="text-cyan-300 font-canva-sans-bold text-lg mb-3">
          {organism.scientific_name}
        </h3>
        <p className="text-gray-400 text-xs mb-4">
          {formatOrigin(organism.origin)}
        </p>
        <ul className="space-y-4">
          {organism.features.map((feature, idx) => (
            <li key={idx} className="text-white text-sm font-canva-sans-regular flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{feature.feature_item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}