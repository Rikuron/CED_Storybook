import { motion } from 'framer-motion'
import { type MammalInfo, formatOrigin } from '../../data/mammalInfo'
import { useResponsive } from '../../hooks/useResponsive'

interface MammalInfoBoxProps {
  mammal: MammalInfo
  position: 'left' | 'right'
}

export const MammalInfoBox = ({
  mammal,
  position
}: MammalInfoBoxProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const boxWidth = isMobile ? 'w-48' : isTablet ? 'w-60' : isTV ? 'w-[70rem]' : 'w-80'
  const titleSize = isMobile ? 'text-sm' : isTablet ? 'text-base' : isTV ? 'text-8xl' : 'text-xl'
  const subtitleSize = isMobile ? 'text-[10px]' : isTablet ? 'text-xs' : isTV ? 'text-7xl' : 'text-base'
  const featureSize = isMobile ? 'text-xs' : isTablet ? 'text-sm' : isTV ? 'text-7xl' : 'text-base'
  const padding = isMobile ? '0.5rem' : isTablet ? '0.75rem' : isTV ? '3rem' : '0.7rem'
  const titleMargin = isMobile ? 'mb-0.5' : isTablet ? 'mb-1' : isTV ? 'mb-8' : 'mb-1'
  const subtitleMargin = isMobile ? 'mb-0.5' : isTablet ? 'mb-1' : isTV ? 'mb-8' : 'mb-1'

  return (
    <motion.div
      className={`absolute ${boxWidth} z-100`}
      onClick={(e) => e.stopPropagation()}
      style={{
        top: isMobile ? '10%' : isTV ? '12%' : '15%',
        left: position === 'left' ? (isMobile ? '5%' : isTV ? '6%' : '10%') : undefined,
        right: position === 'right' ? (isMobile ? '5%' : isTV ? '6%' : '10%') : undefined
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`bg-emerald-900/90 backdrop-blur-sm ${isTV ? 'rounded-[2.5rem]' : 'rounded-xl'} border-2 border-emerald-400/50 shadow-xl`}
        style={{ padding }}
      >
        <h3 className={`text-emerald-300 font-canva-sans-bold ${titleSize} ${titleMargin}`}>
          {mammal.scientific_name}
        </h3>
        <p className={`text-emerald-100/70 italic ${subtitleSize} ${subtitleMargin}`}>
          {formatOrigin(mammal.origin)}
        </p>
        <ul className={`${isMobile ? 'space-y-0.5' : isTablet ? 'space-y-1' : isTV ? 'space-y-6' : 'space-y-2'}`}>
          {mammal.features.map((feature, idx) => (
            <li key={idx} className={`text-white ${featureSize} font-canva-sans-regular flex items-start ${isTV ? 'gap-4' : 'gap-2'}`}>
              <span className="text-emerald-400 mt-1">•</span>
              <span>{feature.feature_item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}