import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * ContactVisual Component.
 * High-performance SVG communication portal representing connectivity,
 * next-stage career progression, and active technological engagement.
 * Positioned in the background as an ambient luminous reflection backdrop.
 */
export function ContactVisual() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="ui-contact-visual"
      aria-hidden="true"
      initial={shouldReduceMotion ? { opacity: 0.85 } : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 0.95, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ui-contact-visual__svg"
      >
        <defs>
          <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#6366f1" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="radarSweepGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="65%" stopColor="#a78bfa" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.42" />
          </linearGradient>

          <filter id="portalFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Radial Core Backdrop Reflection */}
        <circle cx="200" cy="200" r="175" fill="url(#portalGlow)" />

        {/* Pulsing Sonar / Radar Reflection Wave */}
        <motion.circle
          cx="200"
          cy="200"
          stroke="rgba(167, 139, 250, 0.45)"
          strokeWidth="1.2"
          fill="none"
          initial={{ r: 45, opacity: 0.7 }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  r: [45, 175],
                  opacity: [0.75, 0],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        {/* Concentric Communication Rings */}
        <circle
          cx="200"
          cy="200"
          r="140"
          stroke="rgba(124, 58, 237, 0.35)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
        />
        <circle
          cx="200"
          cy="200"
          r="105"
          stroke="rgba(167, 139, 250, 0.45)"
          strokeWidth="1.4"
        />
        <circle
          cx="200"
          cy="200"
          r="70"
          stroke="rgba(124, 58, 237, 0.55)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Rotating Luminous Radar Reflection Sweep */}
        <motion.path
          d="M 200 200 L 340 200 A 140 140 0 0 0 299 101 Z"
          fill="url(#radarSweepGlow)"
          opacity="0.35"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  rotate: [0, 360],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: '200px 200px' }}
        />

        {/* Animated Gyroscopic Outer Ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="125"
          stroke="rgba(167, 139, 250, 0.65)"
          strokeWidth="1.6"
          strokeDasharray="20 40"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  rotate: [0, 360],
                }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: '200px 200px' }}
        />

        {/* Central Technological Beacon with Translucent Glow */}
        <circle
          cx="200"
          cy="200"
          r="24"
          fill="rgba(9, 5, 20, 0.75)"
          stroke="#7c3aed"
          strokeWidth="2"
          filter="url(#portalFilter)"
        />
        <circle cx="200" cy="200" r="8" fill="#a78bfa" />
      </svg>
    </motion.div>
  )
}

export default ContactVisual

