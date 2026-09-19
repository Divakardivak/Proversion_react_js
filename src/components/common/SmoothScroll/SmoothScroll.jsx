import { useEffect, createContext, useContext } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  initSmoothScrollController,
  setReducedMotion,
  smoothScrollTo,
} from './scrollController'
import './SmoothScroll.css'

const SmoothScrollContext = createContext({
  scrollTo: smoothScrollTo,
})

/**
 * Custom SmoothScroll Component
 * Activates high-refresh-rate wheel smoothing and native document scroll synchronization.
 */
export function SmoothScroll({ children }) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setReducedMotion(shouldReduceMotion)
  }, [shouldReduceMotion])

  useEffect(() => {
    const cleanup = initSmoothScrollController()
    return cleanup
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ scrollTo: smoothScrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

/**
 * Hook to access programmatic smooth scroll API in any component
 */
export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export default SmoothScroll
