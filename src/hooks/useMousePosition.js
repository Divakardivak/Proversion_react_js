import { useState, useEffect } from 'react'

/**
 * Hook to track mouse position across the window or within a specific element.
 * @param {React.RefObject} [targetRef] - Optional element ref. If omitted, tracks window.
 * @returns {{ x: number, y: number, normalizedX: number, normalizedY: number, isInside: boolean }}
 */
export function useMousePosition(targetRef = null) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInside: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMouseMove = (event) => {
      if (targetRef && targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const isInside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom

        const normalizedX = (x / rect.width) * 2 - 1 // -1 to 1
        const normalizedY = (y / rect.height) * 2 - 1 // -1 to 1

        setMousePosition({
          x,
          y,
          normalizedX: Math.max(-1, Math.min(1, normalizedX)),
          normalizedY: Math.max(-1, Math.min(1, normalizedY)),
          isInside,
        })
      } else {
        const x = event.clientX
        const y = event.clientY
        const normalizedX = (x / window.innerWidth) * 2 - 1 // -1 to 1
        const normalizedY = (y / window.innerHeight) * 2 - 1 // -1 to 1

        setMousePosition({
          x,
          y,
          normalizedX,
          normalizedY,
          isInside: true,
        })
      }
    }

    const target = targetRef?.current || window
    target.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      target.removeEventListener('mousemove', handleMouseMove)
    }
  }, [targetRef])

  return mousePosition
}

export default useMousePosition
