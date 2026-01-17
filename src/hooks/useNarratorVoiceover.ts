import { useEffect, useRef, useState, useCallback } from 'react'

let globalIsEnabled = true

export const useNarratorVoiceover = (initialVolume: number = 0.8) => {
  const audioRef = useRef<HTMLAudioElement | null>(null) 
  const onEndedCallbackRef = useRef<() => void | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isEnabled, setIsEnabled] = useState(globalIsEnabled)
  const [volume, setVolumeState] = useState(initialVolume)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const play = useCallback((src: string, onEnded?: () => void) => {
    // If voiceover is disabled, immediately call onEnded
    if (!isEnabled) {
      onEnded?.()
      return
    }

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    onEndedCallbackRef.current = onEnded || null

    audioRef.current = new Audio(src)
    audioRef.current.volume = volume
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(console.error)
    
    audioRef.current.onended = () => {
      setIsPlaying(false)
      onEndedCallbackRef.current?.()
      onEndedCallbackRef.current = null
    }
  }, [isEnabled, volume])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [])

  const toggleEnabled = useCallback(() => {
    const newEnabled = !isEnabled
    globalIsEnabled = newEnabled
    setIsEnabled(newEnabled)
    
    if (!newEnabled && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isEnabled])

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    setVolumeState(newVolume)
  }, [])
  
  return {
    isPlaying,
    isEnabled,
    volume,
    play,
    stop,
    toggleEnabled,
    setVolume
  }
}