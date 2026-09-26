import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * ContactVisual Component.
 * Modern, fluid animated ambient aurora gradient mesh that seamlessly
 * suits ProVersion's deep space twilight aesthetic.
 * Replaces the previous circular radar portal with smooth organic luminous orbs
 * and flowing cosmic waves.
 */
export function ContactVisual() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="ui-contact-aurora-bg" aria-hidden="true">
      {/* Core Aurora Orb 1 - Deep Indigo / Royal Blue */}
      <motion.div
        className="ui-contact-aurora-orb ui-contact-aurora-orb--1"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 40, -30, 0],
                y: [0, -50, 30, 0],
                scale: [1, 1.15, 0.92, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Core Aurora Orb 2 - Electric Cyan / Sky Glow */}
      <motion.div
        className="ui-contact-aurora-orb ui-contact-aurora-orb--2"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -50, 40, 0],
                y: [0, 40, -40, 0],
                scale: [1, 0.88, 1.18, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Core Aurora Orb 3 - Violet / Purple Ambiance */}
      <motion.div
        className="ui-contact-aurora-orb ui-contact-aurora-orb--3"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 35, -45, 0],
                y: [0, 35, 20, 0],
                scale: [0.95, 1.2, 0.95, 0.95],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Subtle Cosmic Dust / Micro Grid Accent */}
      <div className="ui-contact-aurora-grid" />

      {/* Fluid Gradient Flow Shimmer Beam */}
      <motion.div
        className="ui-contact-aurora-beam"
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.25, 0.55, 0.25],
                rotate: [0, 8, -6, 0],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default ContactVisual
