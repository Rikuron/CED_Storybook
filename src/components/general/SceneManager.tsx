import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useAssetPreloader } from "../../hooks/useAssetPreloader"
import { sceneAssets } from "../../data/sceneAssets"
import { Scene1_Title } from "../../scenes/Scene1_Title"
import { Scene2_Volcanic } from "../../scenes/Scene2_Volcanic"
import { Scene3_Underwater } from "../../scenes/Scene3_Underwater"
import { Scene4_Amphibian } from "../../scenes/Scene4_Amphibian"
import { Scene5_Dinosaurs } from "../../scenes/Scene5_Dinosaurs"
import { Scene6_Temperature } from "../../scenes/Scene6_Temperature"
import { Scene7_Mammals } from "../../scenes/Scene7_Mammals"
import { Scene8_Humans } from "../../scenes/Scene8_Humans"
import { Scene9_Outro } from "../../scenes/Scene9_Outro"
import { Scene10_Montage } from "../../scenes/Scene10_Montage"

export const SceneManager = () => {
  const [currentScene, setCurrentScene] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingScene, setPendingScene] = useState<number | null>(null)

  // Preload assets for the pending scene (or current scene on initial load)
  const { isLoaded } = useAssetPreloader(
    sceneAssets[pendingScene ?? currentScene] ?? []
  )

  // Background preload for the NEXT scene while viewing current
  useEffect(() => {
    const nextSceneNum = currentScene >= 10 ? 1 : currentScene + 1
    const nextAssets = sceneAssets[nextSceneNum] ?? []
    
    // Silently preload next scene's assets in background
    nextAssets.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [currentScene])

  const nextScene = () => {
    const next = currentScene >= 10 ? 1 : currentScene + 1
    setIsTransitioning(true)
    setPendingScene(next)
  }

  // Complete transition once assets are loaded
  useEffect(() => {
    if (isTransitioning && isLoaded && pendingScene !== null) {
      // Small delay to ensure black screen is visible 
      const timer = setTimeout(() => {
        setCurrentScene(pendingScene)
        setPendingScene(null)
        setIsTransitioning(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning, isLoaded, pendingScene])

  const renderScene = () => {
    console.log("Current Scene: ", currentScene)
    switch (currentScene) {
      case 1:
        return <Scene1_Title key="scene1" onNext={nextScene} />
      case 2:
        return <Scene2_Volcanic key="scene2" onNext={nextScene} />  
      case 3:
        return <Scene3_Underwater key="scene3" onNext={nextScene} />  
      case 4:
        return <Scene4_Amphibian key="scene4" onNext={nextScene} />
      case 5:
        return <Scene5_Dinosaurs key="scene5" onNext={nextScene} />
      case 6:
        return <Scene6_Temperature key="scene6" onNext={nextScene} />
      case 7:
        return <Scene7_Mammals key="scene7" onNext={nextScene} />
      case 8:
        return <Scene8_Humans key="scene8" onNext={nextScene} />
      case 9:
        return <Scene9_Outro key="scene9" onNext={nextScene} />
      case 10:
        return <Scene10_Montage key="scene10" onNext={nextScene} />        
      default:
        return <Scene1_Title key="scene1" onNext={nextScene} />
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      {/* Loading overlay - shows during transition until assets are ready */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Only render scene when NOT transitioning */}
      <AnimatePresence mode="wait">
        {!isTransitioning && renderScene()}
      </AnimatePresence>
    </div>
  )
}