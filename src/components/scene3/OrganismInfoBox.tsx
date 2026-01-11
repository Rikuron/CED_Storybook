import { motion } from "framer-motion"
import { type UnicellInfo, formatOrigin } from "../../data/unicellInfo"
import { useResponsive } from "../../hooks/useResponsive"

interface OrganismInfoBoxProps {
  organism: UnicellInfo
  position: {
    x: string
    y: string
  }
}

export const OrganismInfoBox = ({ organism, position }: OrganismInfoBoxProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()
  
  const xValue = parseInt(position.x)
  const yValue = parseInt(position.y)
  const showOnLeft = xValue > 65
  const showAbove = yValue > 60
  const boxWidth = isMobile ? 'w-48' : isTablet ? 'w-60' : isTV ? 'w-[40rem]' : 'w-72'
  const titleSize = isMobile ? 'text-sm' : isTablet ? 'text-base' : isTV ? 'text-5xl' : 'text-lg'
  const originSize = isMobile ? 'text-[10px]' : isTablet ? 'text-xs' : isTV ? 'text-3xl' : 'text-xs'
  const featureSize = isMobile ? 'text-xs' : isTablet ? 'text-sm' : isTV ? 'text-4xl' : 'text-sm'
  const padding = isMobile ? '0.3rem' : isTablet ? '0.4rem' : isTV ? '2rem' : '0.5rem'

  return (
    <motion.div
      className={`absolute ${boxWidth} z-100`}
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
        style={{ padding: padding }}
      >
        <h3 className={`text-cyan-300 font-canva-sans-bold ${titleSize}`}>
          {organism.scientific_name}
        </h3>
        <p className={`text-gray-400 ${originSize}`}>
          {formatOrigin(organism.origin)}
        </p>
        <ul className={`${isMobile ? 'space-y-0.5' : isTablet ? 'space-y-1' : isTV ? 'space-y-4' : 'space-y-2'}`}>
          {organism.features.map((feature, idx) => (
            <li key={idx} className={`text-white ${featureSize} font-canva-sans-regular flex items-start gap-2`}>
              <span className="text-cyan-400 mt-1">•</span>
              <span>{feature.feature_item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}