import { useState, useRef } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { careerPathHeader, careerMilestones } from '@/data/careerPath'
import { CareerConduit } from './CareerConduit'
import { CareerStepCard } from './CareerStepCard'
import { Container } from '@/components/common/Container'
import { Reveal } from '@/components/common/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './CareerPath.css'

/**
 * Main CareerPath Section Component.
 * Implements the sequential career milestone pipeline:
 * LEARN -> MASTER -> BUILD -> EXPERIENCE -> LAUNCH -> CAREER.
 * Features scroll-driven conduit illumination, moving energy point,
 * and state-aware cards (completed, active, future).
 */
export function CareerPath() {
  const sectionRef = useRef(null)
  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 75%'],
  })

  // Synchronize scroll progress with active milestone stage (guarded against redundant re-renders)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (shouldReduceMotion) return

    const total = careerMilestones.length
    const index = Math.min(
      Math.floor(latest * total),
      total - 1
    )
    if (index >= 0) {
      setActiveStageIndex((prev) => (prev !== index ? index : prev))
    }
  })

  return (
    <section
      id="career-path"
      ref={sectionRef}
      className="ui-career-path"
      aria-label="ProVersion Career Pathway"
    >
      {/* Ambient Lighting */}
      <div className="ui-career-path__bg-glow" aria-hidden="true" />
      <div className="ui-career-path__bg-glow-right" aria-hidden="true" />

      <Container size="xl">
        {/* Section Header */}
        <div className="ui-career-path__header">
          <Reveal direction="down" distance={20} duration={0.6}>
            <span className="ui-career-path__badge">
              <Sparkles size={13} />
              {careerPathHeader.badge}
            </span>
          </Reveal>

          <Reveal direction="up" distance={30} duration={0.7} delay={0.1}>
            <h2 className="ui-career-path__title">{careerPathHeader.title}</h2>
          </Reveal>

          <Reveal direction="up" distance={30} duration={0.7} delay={0.2}>
            <p className="ui-career-path__tagline">{careerPathHeader.subtitle}</p>
          </Reveal>
        </div>

        {/* Career Timeline Pipeline */}
        <div className="ui-career-timeline">
          <CareerConduit
            progress={scrollYProgress}
            milestones={careerMilestones}
            activeStageIndex={activeStageIndex}
          />

          {careerMilestones.map((milestone, idx) => {
            const isEven = idx % 2 !== 0
            const state =
              idx < activeStageIndex
                ? 'completed'
                : idx === activeStageIndex
                ? 'active'
                : 'future'

            return (
              <div
                key={milestone.id}
                className={`ui-career-step-row ${
                  isEven ? 'ui-career-step-row--even' : 'ui-career-step-row--odd'
                }`}
              >
                <CareerStepCard
                  milestone={milestone}
                  index={idx}
                  state={state}
                  isEven={isEven}
                />
              </div>
            )
          })}
        </div>

        {/* Final Tagline Banner */}
        {careerPathHeader.finalTagline && (
          <Reveal direction="up" distance={30} duration={0.7} delay={0.1}>
            <div className="ui-career-final-tagline">
              <div className="ui-career-final-tagline__inner">
                <div className="ui-career-final-tagline__glow" aria-hidden="true" />
                <div className="ui-career-final-tagline__badge">
                  <Sparkles size={14} />
                  <span>FINAL TAGLINE</span>
                </div>
                <h3 className="ui-career-final-tagline__title">
                  {careerPathHeader.finalTagline.title}
                </h3>
                <p className="ui-career-final-tagline__sub">
                  {careerPathHeader.finalTagline.subtitle}
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}

export default CareerPath
