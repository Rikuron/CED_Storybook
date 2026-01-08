import { motion, AnimatePresence } from "framer-motion"
import { TypeWriter } from "./TypeWriter"
import { useResponsive } from "../hooks/useResponsive"

interface TitleSceneContentProps {
  isVisible: boolean
}

export const TitleSceneContent = ({
  isVisible
}: TitleSceneContentProps) => {
  const { isMobile, isTablet, isTV } = useResponsive()

  const titleSize = isMobile ? 'text-lg' : isTablet ? 'text-2xl' : isTV ? 'text-[9rem] leading-none' : 'text-4xl'
  const subtitleSize = isMobile ? 'text-xl' : isTablet ? 'text-4xl' : isTV ? 'text-[13rem] leading-none' : 'text-6xl'
  const taglineSize = isMobile ? 'text-sm' : isTablet ? 'text-lg' : isTV ? 'text-[6rem] leading-none' : 'text-2xl'
  const gapSize = isMobile ? 'gap-y-0' : isTablet ? 'gap-y-0.5' : isTV ? 'gap-y-6' : 'gap-y-0.5'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`relative z-10 flex flex-col items-start justify-start h-full ${isMobile ? 'px-4 py-8' : isTablet ? 'px-8 py-12' : isTV ? 'px-44 py-48' : 'px-16 py-20'}`}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col ${gapSize} text-left`}
          >
            {/* Main Title */}
            <h1 className={titleSize}>
              <TypeWriter 
                text="Evolution Chronicles:"
                delay={500}
                speed={50}
                className="text-white font-helvetica-regular drop-shadow-2xl"
              />
            </h1>

            {/* Subtitle */}
            <h2 className={`${subtitleSize} font-helvetica-bold`}>
              <TypeWriter 
                text="A "
                delay={2500}
                speed={60}
                className="text-white drop-shadow-2xl"
              />
              <TypeWriter 
                text="JOURNEY"
                delay={2620}
                speed={60}
                className="text-pink-400 drop-shadow-2xl"
              />
              <TypeWriter 
                text=" THROUGH TIME"
                delay={3200}
                speed={60}
                className="text-white drop-shadow-2xl"
              />
            </h2>
            
            {/* Tagline */}
            <p className={taglineSize}>
              <TypeWriter 
                text="A Story of Life's Transformation Through Time"
                delay={4500}
                speed={40}
                className="text-white font-nexa tracking-wider"
              />
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}