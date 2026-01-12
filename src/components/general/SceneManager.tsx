import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Scene1_Title } from "../../scenes/Scene1_Title"
import { Scene2_Volcanic } from "../../scenes/Scene2_Volcanic"
import { Scene3_Underwater } from "../../scenes/Scene3_Underwater"
import { Scene4_Amphibian } from "../../scenes/Scene4_Amphibian"
import { Scene5_Dinosaurs } from "../../scenes/Scene5_Dinosaurs"
import { Scene6_Temperature } from "../../scenes/Scene6_Temperature"

export const SceneManager = () => {
  const [currentScene, setCurrentScene] = useState(1)

  const nextScene = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 10))
  }

  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return <Scene6_Temperature key="scene1" onNext={nextScene} />
      case 2:
        return <Scene2_Volcanic key="scene2" onNext={nextScene} />  
      case 3:
        return <Scene3_Underwater key="scene3" onNext={nextScene} />  
      case 4:
        return <Scene4_Amphibian key="scene4" onNext={nextScene} />
      case 5:
        return <Scene5_Dinosaurs key="scene5" onNext={nextScene} />
      case 6:
        return <Scene1_Title key="scene6" onNext={nextScene} />
      default:
        return <Scene1_Title key="scene1" onNext={nextScene} />
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {renderScene()}
      </AnimatePresence>
    </div>
  )
}