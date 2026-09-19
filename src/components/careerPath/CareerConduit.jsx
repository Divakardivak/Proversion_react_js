import { motion, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * CareerConduit Component.
 * High-precision vertical illuminated conduit with a moving energy indicator,
 * progress-filled stroke, and state-aware milestone nodes (completed, current, future).
 * @param {Object} props
 * @param {any} props.progress - Framer Motion scroll progress MotionValue (0 to 1)
 * @param {Array<Object>} props.milestones - List of career milestones
 * @param {number} props.activeStageIndex - Current active milestone index
 */
export function CareerConduit({ progress, milestones, activeStageIndex = 0 }) {
  const shouldReduceMotion = useReducedMotion()

  // Moving energy point position along the conduit
  const energyTop = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div className="ui-career-conduit" aria-hidden="true">
      {/* Background Subdued Guide Track */}
      <div className="ui-career-conduit__track" />

      {/* Active Illuminated Progress Fill */}
      <motion.div
        className="ui-career-conduit__fill"
        style={{
          scaleY: shouldReduceMotion ? 1 : progress,
        }}
      />

      {/* Moving Energy Point at the Leading Edge */}
      {!shouldReduceMotion && (
        <motion.div
          className="ui-career-conduit__energy-head"
          style={{
            top: energyTop,
          }}
        >
          <div className="ui-career-conduit__energy-spark" />
          <div className="ui-career-conduit__energy-ring" />
        </motion.div>
      )}

      {/* Milestone Anchor Nodes along the Conduit */}
      <div className="ui-career-conduit__pips">
        {milestones.map((milestone, idx) => {
          const isCompleted = idx < activeStageIndex
          const isCurrent = idx === activeStageIndex
          const isFuture = idx > activeStageIndex

          const pipStateClass = isCompleted
            ? 'ui-career-conduit__pip--completed'
            : isCurrent
            ? 'ui-career-conduit__pip--current'
            : 'ui-career-conduit__pip--future'

          return (
            <div
              key={milestone.id}
              className={`ui-career-conduit__pip ${pipStateClass}`}
              style={{
                '--pip-accent': milestone.accentColor,
                top: `${(idx / (milestones.length - 1)) * 100}%`,
              }}
            >
              {isCompleted ? (
                <div className="ui-career-conduit__pip-check">
                  <Check size={10} strokeWidth={3} color="#fff" />
                </div>
              ) : isCurrent ? (
                <>
                  <div className="ui-career-conduit__pip-core" />
                  <div className="ui-career-conduit__pip-pulse" />
                </>
              ) : (
                <div className="ui-career-conduit__pip-future" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CareerConduit
