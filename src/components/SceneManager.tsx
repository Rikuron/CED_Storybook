import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Scene1_Title } from "../scenes/Scene1_Title"
import { Scene2_Volcanic } from "../scenes/Scene2_Volcanic"
import { Scene3_Underwater } from "../scenes/Scene3_Underwater"

export const SceneManager = () => {
  const [currentScene, setCurrentScene] = useState(1)

  const nextScene = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 6))
  }

  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return <Scene1_Title key="scene3" onNext={nextScene} />
      case 2:
        return <Scene2_Volcanic key="scene2" onNext={nextScene} />
      case 3:
        return <Scene3_Underwater key="scene1" onNext={nextScene} />
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