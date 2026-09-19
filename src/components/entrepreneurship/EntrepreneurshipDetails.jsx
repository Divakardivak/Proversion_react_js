import { memo } from 'react'
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { MagneticButton } from '@/components/common/MagneticButton'

/**
 * Redesigned EntrepreneurshipDetails Component.
 * Stable, high-performance milestone showcase that NEVER unmounts or collapses height,
 * completely eliminating any flickering, blinking, or layout loops.
 * Features a modern 2-column command layout with brand accents.
 */
export const EntrepreneurshipDetails = memo(function EntrepreneurshipDetails({ stage }) {
  if (!stage) return null

  return (
    <div className="ui-entrepreneurship-details">
      <div
        className="ui-entrepreneurship-details__card"
        style={{
          '--card-accent': stage.accentColor,
        }}
      >
        {/* Top Eyebrow Header Row */}
        <div className="ui-entrepreneurship-details__eyebrow-row">
          <div className="ui-entrepreneurship-details__step-badge">
            <span
              className="ui-entrepreneurship-details__step-dot"
              style={{ backgroundColor: stage.accentColor, boxShadow: `0 0 8px ${stage.accentColor}` }}
            />
            <span>MILESTONE {stage.step} OF 05</span>
          </div>

          <div className="ui-entrepreneurship-details__free-badge">
            <Sparkles size={13} className="ui-entrepreneurship-details__free-icon" />
            <span>100% FREE INCUBATION PROGRAM</span>
          </div>

          <div className="ui-entrepreneurship-details__gov-badge">
            <ShieldCheck size={13} />
            <span>GOVT. RECOGNIZED MSME SUPPORT</span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="ui-entrepreneurship-details__content-grid">
          {/* Left Column: Stage Identity, Description & CTAs */}
          <div className="ui-entrepreneurship-details__col-info">
            <div className="ui-entrepreneurship-details__header">
              <h3 className="ui-entrepreneurship-details__title">
                {stage.title}
              </h3>
              <p
                className="ui-entrepreneurship-details__tagline"
                style={{ color: stage.accentColor }}
              >
                {stage.tagline}
              </p>
            </div>

            <p className="ui-entrepreneurship-details__description">
              {stage.description}
            </p>

            <div className="ui-entrepreneurship-details__actions">
              <MagneticButton strength={0.2}>
                <Button
                  variant="primary"
                  size="md"
                  href="#contact"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                  className="ui-entrepreneurship-details__primary-btn"
                >
                  Register for Free
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Button
                  variant="glass"
                  size="md"
                  href="#contact"
                >
                  Program Details
                </Button>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Structured Deliverables Grid */}
          <div className="ui-entrepreneurship-details__col-deliverables">
            <div className="ui-entrepreneurship-details__points-header">
              <Award size={14} style={{ color: stage.accentColor }} />
              <span>KEY DELIVERABLES &amp; FOUNDER SUPPORT</span>
            </div>

            <div className="ui-entrepreneurship-details__points-grid">
              {stage.points.map((point, index) => (
                <div
                  key={`${stage.id}-${index}`}
                  className="ui-entrepreneurship-details__point-item"
                >
                  <div
                    className="ui-entrepreneurship-details__point-icon"
                    style={{
                      color: stage.accentColor,
                      backgroundColor: `${stage.accentColor}18`,
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="ui-entrepreneurship-details__point-text">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default EntrepreneurshipDetails
