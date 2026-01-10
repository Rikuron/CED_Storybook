import { motion } from "framer-motion"
import { unicellInfo } from "../data/unicellInfo"
import { useResponsive } from "../hooks/useResponsive"

interface FloatingOrganismsProps {
  challengeMode: boolean
  isTransitioning: boolean
  hoveredOrganism: number | null
  onHover: (id: number | null) => void
  onOrganismClick: () => void
}

export const FloatingOrganisms = ({
  challengeMode,
  isTransitioning,
  hoveredOrganism,
  onHover,
  onOrganismClick
}: FloatingOrganismsProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const baseScale = isMobile ? 0.5 : isTablet ? 1.2 : isTV ? 6 : 2
  const challengeScale = isMobile ? 2 : isTablet ? 3 : isTV ? 14 : 5
  const hoverScale = isMobile ? 1.2 : isTablet ? 1.8 : isTV ? 8 : 2.5

  return (
    <>
      {unicellInfo.map((org) => (
        <motion.div
          key={org.id}
          className={`absolute ${challengeMode ? '' : 'cursor-pointer'} ${hoveredOrganism === org.id ? 'z-50' : 'z-20'}`}
          style={{ left: org.position.x, top: org.position.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isTransitioning ? {
            opacity: 0,
            x: '-100vw',
            scale: challengeMode ? challengeScale : baseScale
          } : {
            opacity: 1,
            scale: challengeMode ? challengeScale : baseScale,
            y: [0, -10, 0]
          }}
          transition={{
            y: {
              duration: org.floatDuration || 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              delay: 2 + org.id * 0.3,
              duration: 0.5
            },
            scale: { duration: 0.5 }
          }}
          onHoverStart={() => !challengeMode && onHover(org.id)}
          onHoverEnd={() => !challengeMode && onHover(null)}
          whileHover={challengeMode ? {} : { scale: hoverScale }}
          onClick={onOrganismClick}
        >
          <img 
            src={org.image} 
            alt={org.scientific_name}
            style={{ width: org.size, height: 'auto' }}
            className="drop-shadow-lg"
          />
        </motion.div>
      ))}
    </>
  )
}