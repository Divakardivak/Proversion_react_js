import { motion } from 'framer-motion'
import * as variants from '@/animations/variants'
import { viewportPresets } from '@/animations/presets'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Reusable Reveal component
 * Animates elements into view as they enter the viewport.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'fadeUp' | 'fadeIn' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'blurIn'} [props.variant='fadeUp']
 * @param {number} [props.delay=0]
 * @param {number} [props.duration]
 * @param {'fit-content' | '100%'} [props.width='100%']
 * @param {string} [props.className='']
 */
export function Reveal({
  children,
  variant,
  animation,
  direction,
  delay = 0,
  duration,
  width = '100%',
  className = '',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion()

  // Resolve variant name from variant, animation, or direction props
  let resolvedKey = variant || animation
  if (!resolvedKey && direction) {
    if (direction === 'down') resolvedKey = 'fadeDown'
    else if (direction === 'up') resolvedKey = 'fadeUp'
    else if (direction === 'left') resolvedKey = 'fadeLeft'
    else if (direction === 'right') resolvedKey = 'fadeRight'
  }
  if (!resolvedKey) resolvedKey = 'fadeUp'

  const selectedVariant = variants[resolvedKey] || variants.fadeUp

  if (shouldReduceMotion) {
    return (
      <div className={className} style={{ width }} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={{ width }}
      variants={selectedVariant}
      custom={{ delay, duration }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportPresets.standard}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
