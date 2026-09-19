import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * JourneyPath Component.
 * Renders an undulating SVG curved path that progressively illuminates
 * as the user scrolls or selects stages through the journey.
 * @param {Object} props
 * @param {any} [props.progress] - MotionValue or number (0 to 1) representing path progress
 * @param {number} props.activeIndex - Current active stage index (0-4)
 */
export function JourneyPath({ progress, activeIndex = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  // Desktop curved path definition through the 5 milestones:
  // Node 0: (100, 60), Node 1: (300, 160), Node 2: (500, 80), Node 3: (700, 170), Node 4: (900, 100)
  const pathD =
    'M 100 60 C 200 60, 200 160, 300 160 C 400 160, 400 80, 500 80 C 600 80, 600 170, 700 170 C 800 170, 800 100, 900 100'

  // Discrete progress percentage if MotionValue is not directly passed
  const discreteProgress = (activeIndex + 1) / 5

  return (
    <div className="ui-journey-path-container" aria-hidden="true">
      <svg
        viewBox="0 0 1000 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ui-journey-path-svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glowing Linear Gradient */}
          <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFB81C" />
            <stop offset="25%" stopColor="#FFC928" />
            <stop offset="55%" stopColor="#2563EB" />
            <stop offset="80%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        {/* Subdued Background Guide Track */}
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 6"
        />

        {/* Soft Glowing Underlay Path (zero filter re-rasterization) */}
        <motion.path
          d={pathD}
          stroke="url(#journeyGradient)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity={0.35}
          initial={{ pathLength: 0.2 }}
          animate={{
            pathLength: shouldReduceMotion ? 1 : discreteProgress,
          }}
          style={progress && !shouldReduceMotion ? { pathLength: progress } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        />

        {/* Crisp Foreground Illuminated Path */}
        <motion.path
          d={pathD}
          stroke="url(#journeyGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0.2 }}
          animate={{
            pathLength: shouldReduceMotion ? 1 : discreteProgress,
          }}
          style={progress && !shouldReduceMotion ? { pathLength: progress } : {}}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        />
      </svg>
    </div>
  )
}

export default JourneyPath
