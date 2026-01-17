import { SceneManager } from './components/general/SceneManager'
import { MusicToggle } from './components/general/MusicToggle'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'

function App() {
  const { isPlaying, volume, toggle, setVolume } = useBackgroundMusic('/audio/Background_Music.mp3', 0.3)
  

  return (
    <>
      <SceneManager />
      <MusicToggle 
        isPlaying={isPlaying} 
        volume={volume} 
        onToggle={toggle}
        onVolumeChange={setVolume} 
      />
    </>
  )
}

export default App