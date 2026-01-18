import { SceneManager } from './components/general/SceneManager'
import { SoundControls } from './components/general/SoundControls'
import { FullScreenPrompt } from './components/general/FullScreenPrompt'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import { useNarratorVoiceover } from './hooks/useNarratorVoiceover'

function App() {
  const { isPlaying, volume, toggle, setVolume } = useBackgroundMusic('/audio/sfx/Background_Music.mp3', 0.3)
  const voiceover = useNarratorVoiceover(0.8)

  return (
    <>
      <SceneManager />
      <SoundControls
        isMusicPlaying={isPlaying}
        musicVolume={volume}
        onMusicToggle={toggle}
        onMusicVolumeChange={setVolume}
        isVoiceoverEnabled={voiceover.isEnabled}
        voiceoverVolume={voiceover.volume}
        onVoiceoverToggle={voiceover.toggleEnabled}
        onVoiceoverVolumeChange={voiceover.setVolume}
      />
      <FullScreenPrompt />
    </>
  )
}

export default App