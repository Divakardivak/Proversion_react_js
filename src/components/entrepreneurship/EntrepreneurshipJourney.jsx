import { JourneyPath } from './JourneyPath'
import { JourneyStage } from './JourneyStage'

/**
 * EntrepreneurshipJourney Component.
 * Coordinates the horizontal continuous product journey on desktop
 * and the vertical interactive journey on mobile.
 * @param {Object} props
 * @param {Array<Object>} props.stages - List of 5 entrepreneurship stages
 * @param {string} props.activeId - Currently active stage id
 * @param {(id: string) => void} props.onSelectStage - Callback when a stage is selected
 * @param {any} [props.scrollProgress] - Framer Motion scroll progress
 * @param {boolean} [props.isMobile=false]
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
  // Node 0: (10%, 25%), Node 1: (30%, 66%), Node 2: (50%, 33%), Node 3: (70%, 70%), Node 4: (90%, 41%)
  const stagePositions = [
    { left: '10%', top: '25%' },
    { left: '30%', top: '66%' },
    { left: '50%', top: '33%' },
    { left: '70%', top: '70%' },
    { left: '90%', top: '41%' },
  ]

  if (isMobile) {
    // Mobile Vertical Journey
    return (
      <div className="ui-journey-vertical" role="region" aria-label="Entrepreneurship Journey Stages">
        <div className="ui-journey-vertical__track" aria-hidden="true">
          <div
            className="ui-journey-vertical__progress"
            style={{
              height: `${((activeIndex + 1) / stages.length) * 100}%`,
            }}
          />
        </div>

        <div className="ui-journey-vertical__list">
          {stages.map((stage, idx) => {
            const isActive = stage.id === activeId
            const isPassed = idx <= activeIndex

            return (
              <div
                key={stage.id}
                className={`ui-journey-vertical__item ${
                  isActive ? 'ui-journey-vertical__item--active' : ''
                }`}
                onClick={() => onSelectStage(stage.id)}
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

  // Desktop Horizontal Journey
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
