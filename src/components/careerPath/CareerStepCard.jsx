import { motion } from 'framer-motion'
import {
  BookOpen,
  Code2,
  Briefcase,
  Layers,
  Award,
  Rocket,
  CheckCircle2,
  Check,
  GraduationCap,
  Users,
  Bot,
  Laptop,
  Target,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

// Icon mapping for milestone stages
const ICON_MAP = {
  BookOpen,
  GraduationCap,
  Code2,
  Briefcase,
  Users,
  Award,
  Bot,
  Layers,
  Target,
  Laptop,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FolderGit2: Layers,
}

/**
 * CareerStepCard Component.
 * Individual milestone card with state-aware presentation (completed, active, future),
 * horizontal connector arm to the central conduit, and verified ProVersion metrics.
 * @param {Object} props
 * @param {Object} props.milestone - Milestone data
 * @param {number} props.index - Step index
 * @param {string} props.state - 'completed' | 'active' | 'future'
 * @param {boolean} props.isEven - Alternating alignment flag
 */
export function CareerStepCard({ milestone, index, state = 'future', isEven }) {
  const IconComponent = ICON_MAP[milestone.iconName] || BookOpen

  const isCompleted = state === 'completed'
  const isActive = state === 'active'

  return (
    <motion.div
      className={`ui-career-card ui-career-card--${state} ${
        isEven ? 'ui-career-card--even' : 'ui-career-card--odd'
      }`}
      style={{
        '--card-accent': milestone.accentColor,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Horizontal Connector Arm to Central Conduit */}
      <div className="ui-career-card__connector" aria-hidden="true">
        <div className="ui-career-card__connector-line" />
        <div className="ui-career-card__connector-dot" />
      </div>

      {/* Step Header Badges */}
      <div className="ui-career-card__header">
        <div
          className="ui-career-card__icon-box"
          style={{
            color: milestone.accentColor,
            borderColor: isActive ? milestone.accentColor : `${milestone.accentColor}44`,
            background: isActive ? `${milestone.accentColor}20` : `${milestone.accentColor}10`,
          }}
        >
          <IconComponent size={20} />
        </div>

        <div className="ui-career-card__badge-group">
          <span
            className="ui-career-card__step-badge"
            style={{
              color: milestone.accentColor,
              borderColor: `${milestone.accentColor}44`,
              background: `${milestone.accentColor}10`,
            }}
          >
            STEP {milestone.step}
          </span>
          <span className="ui-career-card__phase-badge">{milestone.phase}</span>

          {isCompleted && (
            <span className="ui-career-card__status-badge">
              <Check size={11} strokeWidth={3} />
              <span>COMPLETED</span>
            </span>
          )}
        </div>
      </div>

      {/* Dominant Title */}
      <h3 className="ui-career-card__title">{milestone.title}</h3>

      {/* Description */}
      <p className="ui-career-card__description">{milestone.description}</p>

      {/* Highlights / Verified Metrics */}
      <div className="ui-career-card__highlights">
        {milestone.highlights.map((highlight, idx) => (
          <div key={idx} className="ui-career-card__highlight-pill">
            <CheckCircle2
              size={13}
              color={isActive ? milestone.accentColor : 'var(--text-muted)'}
              className="shrink-0"
            />
            <span>{highlight}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default CareerStepCard
