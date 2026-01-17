import { useEffect, useRef, useState } from 'react'

export const useBackgroundMusic = (
  src: string,
  initialVolume: number = 0.3
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.loop = true
    audioRef.current.volume = initialVolume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [src, initialVolume])
  
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
                      .then(() => setIsPlaying(true))
                      .catch(console.error)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggle = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolumeState(newVolume)
    }
  }

  return {
    isPlaying,
    isMuted,
    volume,
    play,
    pause,
    toggle,
    toggleMute,
    setVolume
  }
}