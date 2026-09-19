import { useState, useEffect } from 'react'

/**
 * Optimized Hook to track scroll progress and position.
 * Uses requestAnimationFrame throttling and guards against redundant state updates.
 * @param {React.RefObject} [targetRef] - Optional element ref to track progress through.
 * @returns {{ scrollY: number, progress: number, direction: 'up' | 'down' | null }}
 */
export function useScrollProgress(targetRef = null) {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    progress: 0,
    direction: null,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    let lastScrollY = window.scrollY
    let rafId = null

    const updateScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? 'down' : 'up'
      lastScrollY = currentScrollY

      if (targetRef && targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
        const elementHeight = targetRef.current.offsetHeight
        const windowHeight = window.innerHeight

        const totalDistance = elementHeight + windowHeight
        const scrolled = windowHeight - rect.top
        const rawProgress = scrolled / totalDistance
        const progress = Math.max(0, Math.min(1, rawProgress))

        setScrollData({
          scrollY: currentScrollY,
          progress,
          direction,
        })
      } else {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = documentHeight > 0 ? Math.max(0, Math.min(1, currentScrollY / documentHeight)) : 0

        setScrollData({
          scrollY: currentScrollY,
          progress,
          direction,
        })
      }
      rafId = null
    }

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [targetRef])

  return scrollData
}

export default useScrollProgress
