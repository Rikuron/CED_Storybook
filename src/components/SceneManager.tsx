import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Scene1_Title } from "../scenes/Scene1_Title"
import { Scene2_Orbit } from "../scenes/Scene2_Orbit"
import { Scene3_AtmosphericEntry } from "../scenes/Scene3_AtmosphericEntry"
import { Scene4_Volcanic } from "../scenes/Scene4_Volcanic"
import { Scene5_Dive } from "../scenes/Scene5_Dive"
import { Scene6_Microscopic } from "../scenes/Scene6_Microscopic"

export const SceneManager = () => {
  const [currentScene, setCurrentScene] = useState(1)

  const nextScene = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 6))
  }

  const renderScene = () => {
    switch (currentScene) {
      case 1:
        return <Scene1_Title key="scene1" onNext={nextScene} />
      case 2:
        return <Scene2_Orbit key="scene2" onNext={nextScene} />
      case 3:
        return <Scene3_AtmosphericEntry key="scene3" onNext={nextScene} />
      case 4:
        return <Scene4_Volcanic key="scene4" onNext={nextScene} />
      case 5:
        return <Scene5_Dive key="scene5" onNext={nextScene} />
      case 6:
        return <Scene6_Microscopic key="scene6" />
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