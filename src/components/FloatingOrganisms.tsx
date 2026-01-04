import { motion } from "framer-motion"
import { unicellInfo } from "../data/unicellInfo"

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
            scale: challengeMode ? 5 : 2
          } : {
            opacity: 1,
            scale: challengeMode ? 5 : 2,
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
          whileHover={challengeMode ? {} : { scale: 2.5 }}
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