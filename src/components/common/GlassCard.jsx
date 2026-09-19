import { useRef, useCallback } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './GlassCard.css'

/**
 * Reusable GlassCard component with glassmorphism surface and subtle dynamic spotlight.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.hoverEffect=true] - Elevates on hover
 * @param {boolean} [props.spotlight=true] - Dynamic radial spotlight on mouse move
 * @param {string} [props.className='']
 */
export function GlassCard({
  children,
  hoverEffect = true,
  spotlight = true,
  className = '',
  ...rest
}) {
  const cardRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMove = useCallback(
    (event) => {
      if (shouldReduceMotion || !spotlight || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      cardRef.current.style.setProperty('--mouse-x', `${x}px`)
      cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    },
    [shouldReduceMotion, spotlight]
  )

  const classes = [
    'ui-glass-card',
    hoverEffect ? 'ui-glass-card--hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={cardRef}
      className={classes}
      onMouseMove={handleMouseMove}
      {...rest}
    >
      {spotlight && !shouldReduceMotion && (
        <div className="ui-glass-card__spotlight" aria-hidden="true" />
      )}
      <div className="ui-glass-card__content">{children}</div>
    </div>
  )
}

export default GlassCard
