import { Lightbulb, Box, CheckCircle, Rocket, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { JourneyPath } from './JourneyPath'
import { JourneyStage } from './JourneyStage'

const STAGE_ICONS = {
  orb: Lightbulb,
  cube: Box,
  target: CheckCircle,
  rocket: Rocket,
  crystal: TrendingUp,
}

/**
 * EntrepreneurshipJourney Component.
 * Coordinates the horizontal continuous product journey on desktop
 * and a streamlined, intuitive touch stepper on mobile.
 */
export function EntrepreneurshipJourney({
  stages,
  activeId,
  onSelectStage,
  scrollProgress,
  isMobile = false,
}) {
  const activeIndex = stages.findIndex((s) => s.id === activeId)

  // Desktop horizontal positions matching the SVG curve anchor points:
  const stagePositions = [
    { left: '10%', top: '25%' },
    { left: '30%', top: '66%' },
    { left: '50%', top: '33%' },
    { left: '70%', top: '70%' },
    { left: '90%', top: '41%' },
  ]

  if (isMobile) {
    // ── Streamlined Mobile Stage Stepper ──
    const handlePrev = () => {
      const prevIdx = activeIndex > 0 ? activeIndex - 1 : stages.length - 1
      onSelectStage(stages[prevIdx].id)
    }

    const handleNext = () => {
      const nextIdx = activeIndex < stages.length - 1 ? activeIndex + 1 : 0
      onSelectStage(stages[nextIdx].id)
    }

    return (
      <div className="ui-journey-mobile-stepper" role="region" aria-label="Entrepreneurship Journey Stages">
        {/* Horizontal Scrollable Stage Tabs */}
        <div className="ui-journey-mobile-tabs">
          {stages.map((stage, idx) => {
            const isActive = stage.id === activeId
            const IconComponent = STAGE_ICONS[stage.visualType] || Lightbulb

            return (
              <button
                key={stage.id}
                type="button"
                className={`ui-journey-mobile-tab ${isActive ? 'is-active' : ''}`}
                style={{
                  '--stage-accent': stage.accentColor,
                }}
                onClick={() => onSelectStage(stage.id)}
                aria-pressed={isActive}
                aria-label={`Select Stage 0${idx + 1}: ${stage.title}`}
              >
                <span className="mobile-tab-icon-wrap">
                  <IconComponent size={14} />
                </span>
                <span className="mobile-tab-text">
                  <span className="mobile-tab-num">0{idx + 1}</span>
                  <span className="mobile-tab-title">{stage.stepTitle || stage.title.split(' ')[0]}</span>
                </span>
                {isActive && <span className="mobile-tab-active-dot" />}
              </button>
            )
          })}
        </div>

        {/* Linear Stage Progress Track */}
        <div className="ui-journey-mobile-progress-bar" aria-hidden="true">
          <div
            className="ui-journey-mobile-progress-fill"
            style={{
              width: `${((activeIndex + 1) / stages.length) * 100}%`,
              background: stages[activeIndex]?.accentColor || '#7c3aed',
            }}
          />
        </div>

        {/* Quick Prev / Next Controls */}
        <div className="ui-journey-mobile-nav-bar">
          <button
            type="button"
            className="mobile-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous milestone"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          <span className="mobile-nav-indicator">
            Milestone <strong>0{activeIndex + 1}</strong> of <strong>0{stages.length}</strong>
          </span>

          <button
            type="button"
            className="mobile-nav-btn next"
            onClick={handleNext}
            aria-label="Next milestone"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // ── Desktop Horizontal Journey (100% Preserved) ──
  return (
    <div
      className="ui-journey-canvas"
      role="region"
      aria-label="Entrepreneurship Product Journey"
    >
      {/* Dynamic SVG Curved Path */}
      <JourneyPath progress={scrollProgress} activeIndex={activeIndex} />

      {/* Floating Milestone Stage Nodes along the path */}
      <div className="ui-journey-canvas__stages">
        {stages.map((stage, idx) => {
          const isActive = stage.id === activeId
          const isPassed = idx <= activeIndex
          const pos = stagePositions[idx] || { left: `${(idx + 1) * 18}%`, top: '50%' }

          return (
            <div
              key={stage.id}
              className="ui-journey-canvas__node-anchor"
              style={{
                left: pos.left,
                top: pos.top,
              }}
            >
              <JourneyStage
                stage={stage}
                isActive={isActive}
                isPassed={isPassed}
                onSelect={() => onSelectStage(stage.id)}
                index={idx}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EntrepreneurshipJourney
