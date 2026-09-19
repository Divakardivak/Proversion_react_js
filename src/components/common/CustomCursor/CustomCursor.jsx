import { useState, useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './CustomCursor.css'

/**
 * Subtle desktop custom cursor with interactive hover expansion and trailing spring ring.
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const springConfig = { stiffness: 500, damping: 28, mass: 0.1 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only enable on desktop devices with fine pointer
    if (typeof window === 'undefined' || shouldReduceMotion) return

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = Boolean(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]')
      )
      if (ringRef.current) {
        ringRef.current.classList.toggle('ui-cursor--hover', isInteractive)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible, shouldReduceMotion])

  if (shouldReduceMotion || !isVisible) return null

  return (
    <>
      {/* Inner Dot (zero React re-renders) */}
      <div
        ref={dotRef}
        className="ui-cursor__dot"
        aria-hidden="true"
      />

      {/* Trailing Outer Ring (zero React re-renders on hover) */}
      <motion.div
        ref={ringRef}
        className="ui-cursor"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        aria-hidden="true"
      >
        <div className="ui-cursor__ring" />
      </motion.div>
    </>
  )
}

export default CustomCursor
