import { useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './MagneticButton.css'

/**
 * MagneticButton component
 * Pulls slightly toward the user's cursor on hover for a magnetic feel.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.strength=0.3] - Magnetic attraction factor
 * @param {string} [props.className='']
 */
export function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (event) => {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (event.clientX - centerX) * strength
    const distanceY = (event.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`ui-magnetic ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton
