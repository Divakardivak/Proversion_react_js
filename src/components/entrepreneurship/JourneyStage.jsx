import { motion } from 'framer-motion'
import { Lightbulb, Box, CheckCircle, Rocket, TrendingUp } from 'lucide-react'

/**
 * Renders the custom lightweight visual object for each milestone stage.
 * Uses pure SVG and CSS animations for 60fps performance without heavy WebGL.
 */
function StageVisualObject({ type, color, isActive }) {
  switch (type) {
    case 'orb':
      // IDEA: Radiant glowing orb with concentric light wave
      return (
        <div className={`ui-stage-visual ui-stage-visual--orb ${isActive ? 'ui-stage-visual--active' : ''}`}>
          <div
            className="ui-stage-visual__orb-glow"
            style={{ backgroundColor: color, boxShadow: `0 0 24px ${color}` }}
          />
          <div className="ui-stage-visual__orb-icon" style={{ color: '#fff' }}>
            <Lightbulb size={20} />
          </div>
        </div>
      )

    case 'cube':
      // BUILD: Isometric architectural foundation structure
      return (
        <div className={`ui-stage-visual ui-stage-visual--cube ${isActive ? 'ui-stage-visual--active' : ''}`}>
          <div
            className="ui-stage-visual__cube-frame"
            style={{ borderColor: color, boxShadow: isActive ? `0 0 20px ${color}88` : 'none' }}
          >
            <Box size={20} color={color} />
          </div>
        </div>
      )

    case 'target':
      // VALIDATE: Precision metric target / radar reticle
      return (
        <div className={`ui-stage-visual ui-stage-visual--target ${isActive ? 'ui-stage-visual--active' : ''}`}>
          <div
            className="ui-stage-visual__target-ring"
            style={{ borderColor: color, boxShadow: isActive ? `0 0 22px ${color}88` : 'none' }}
          >
            <CheckCircle size={20} color={color} />
          </div>
        </div>
      )

    case 'rocket':
      // LAUNCH: Ascending vector chevron
      return (
        <div className={`ui-stage-visual ui-stage-visual--rocket ${isActive ? 'ui-stage-visual--active' : ''}`}>
          <div
            className="ui-stage-visual__rocket-shell"
            style={{ borderColor: color, boxShadow: isActive ? `0 0 24px ${color}aa` : 'none' }}
          >
            <Rocket size={20} color={color} />
          </div>
        </div>
      )

    case 'rings':
      // GROW: Concentric expanding ripple rings
      return (
        <div className={`ui-stage-visual ui-stage-visual--rings ${isActive ? 'ui-stage-visual--active' : ''}`}>
          <div
            className="ui-stage-visual__rings-outer"
            style={{ borderColor: `${color}66` }}
          />
          <div
            className="ui-stage-visual__rings-inner"
            style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}
          >
            <TrendingUp size={20} color="#fff" />
          </div>
        </div>
      )

    default:
      return null
  }
}

/**
 * JourneyStage Component.
 * Individual interactive milestone node on the Entrepreneurship path.
 * Keyboard accessible, responsive, and animated.
 */
export function JourneyStage({
  stage,
  isActive,
  isPassed,
  onSelect,
  index,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <motion.div
      className={`ui-journey-stage ui-journey-stage--${stage.id} ${
        isActive ? 'ui-journey-stage--active' : ''
      } ${isPassed ? 'ui-journey-stage--passed' : ''}`}
      style={{
        '--stage-accent': stage.accentColor,
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
    >
      <button
        type="button"
        className="ui-journey-stage__button"
        onClick={onSelect}
        onMouseEnter={onSelect}
        onKeyDown={handleKeyDown}
        aria-label={`Stage ${stage.step}: ${stage.title} - ${stage.tagline}`}
        aria-selected={isActive}
        tabIndex={0}
      >
        {/* Custom Visual Milestone Object */}
        <StageVisualObject
          type={stage.visualType}
          color={stage.accentColor}
          isActive={isActive}
        />

        {/* Stage Meta Labels */}
        <div className="ui-journey-stage__meta">
          <span className="ui-journey-stage__step">STAGE {stage.step}</span>
          <span className="ui-journey-stage__title">{stage.title}</span>
        </div>

        {/* Active Indicator Pip */}
        <div
          className="ui-journey-stage__indicator"
          style={{
            backgroundColor: isActive ? stage.accentColor : 'transparent',
            borderColor: stage.accentColor,
          }}
        />
      </button>
    </motion.div>
  )
}

export default JourneyStage
