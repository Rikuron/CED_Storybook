import { motion } from "framer-motion"
import { unicellInfo } from "../../data/unicellInfo"
import { useResponsive } from "../../hooks/useResponsive"

interface FloatingOrganismsProps {
  challengeMode: boolean
  isTransitioning: boolean
  hoveredOrganism: number | null
  onHover: (id: number | null) => void
  onOrganismClick: () => void
  montageMode?: boolean
}

export const FloatingOrganisms = ({
  challengeMode,
  isTransitioning,
  hoveredOrganism,
  onHover,
  onOrganismClick,
  montageMode = false
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
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: montageMode ? 200 : 0
          }}
          animate={montageMode ? { 
            opacity: [0, 1, 1, 0],
            x: -window.innerWidth - 300,
            scale: baseScale,
            y: [0, -10, 0, 10, 0]
          } : isTransitioning ? {
            opacity: 0,
            x: '-100vw',
            scale: challengeMode ? challengeScale : baseScale
          } : {
            opacity: 1,
            scale: challengeMode ? challengeScale : baseScale,
            y: [0, -10, 0]
          }}
          transition={montageMode ? {
            x: {
              duration: 2.5,
              delay: org.id * 0.3,
              ease: "linear"
            },
            opacity: {
              duration: 2.5,
              delay: org.id * 0.3
            },
            y: {
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: { duration: 0.3 }
          } : {
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