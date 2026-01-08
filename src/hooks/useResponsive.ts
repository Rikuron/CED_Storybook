import { useState, useEffect } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'tv'

const getBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth

  if (width < 640) return 'mobile'
  if (width < 1024) return 'tablet'
  if (width < 1920) return 'desktop'
  return 'tv'
}

export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint())

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    isTV: breakpoint === 'tv'
  }
}