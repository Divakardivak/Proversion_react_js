import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import {
  entrepreneurshipHeader,
  entrepreneurshipStages,
} from '@/data/entrepreneurship'
import { EntrepreneurshipJourney } from './EntrepreneurshipJourney'
import { EntrepreneurshipDetails } from './EntrepreneurshipDetails'
import { Container } from '@/components/common/Container'
import { Reveal } from '@/components/common/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Entrepreneurship.css'

/**
 * Main Entrepreneurship Section Component.
 * Implements the interactive "IDEA -> BUILD -> VALIDATE -> LAUNCH -> GROW"
 * product journey with scroll-driven path activation, custom visual milestone objects,
 * and an authentic glass details panel.
 */
export function Entrepreneurship() {
  const sectionRef = useRef(null)
  const [activeId, setActiveId] = useState(entrepreneurshipStages[0].id)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Track screen size for mobile vertical vs desktop horizontal layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const manualOverrideRef = useRef(0)

  // Scroll tracking through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 70%'],
  })

  // Synchronize scroll progress with active milestone stage with hysteresis and manual lock
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (shouldReduceMotion) return

    // Don't override if user recently clicked a stage
    if (Date.now() - manualOverrideRef.current < 1200) return

    const total = entrepreneurshipStages.length
    // Calculate index with safe bounds
    const rawIdx = latest * total
    const index = Math.min(Math.max(0, Math.floor(rawIdx)), total - 1)

    if (index >= 0 && entrepreneurshipStages[index]) {
      const nextId = entrepreneurshipStages[index].id
      setActiveId((prev) => (prev !== nextId ? nextId : prev))
    }
  })

  const activeStage = useMemo(() => {
    return (
      entrepreneurshipStages.find((s) => s.id === activeId) ||
      entrepreneurshipStages[0]
    )
  }, [activeId])

  const handleSelectStage = useCallback((id) => {
    manualOverrideRef.current = Date.now()
    setActiveId(id)
  }, [])

  return (
    <section
      id="entrepreneurship"
      ref={sectionRef}
      className="ui-entrepreneurship"
      aria-label="ProVersion Entrepreneurship Development Program"
    >
      {/* Ambient Background Glows */}
      <div className="ui-entrepreneurship__bg-glow" aria-hidden="true" />
      <div className="ui-entrepreneurship__bg-glow-right" aria-hidden="true" />

      <Container size="xl">
        {/* Section Header */}
        <div className="ui-entrepreneurship__header">
          <Reveal direction="down" distance={20} duration={0.6}>
            <span className="ui-entrepreneurship__badge">
              <Sparkles size={13} />
              {entrepreneurshipHeader.badge}
            </span>
          </Reveal>

          <Reveal direction="up" distance={30} duration={0.7} delay={0.1}>
            <h2 className="ui-entrepreneurship__title">
              {entrepreneurshipHeader.title}
            </h2>
          </Reveal>

          <Reveal direction="up" distance={30} duration={0.7} delay={0.2}>
            <p className="ui-entrepreneurship__tagline">
              {entrepreneurshipHeader.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Product Journey + Details Layout */}
        <div className="ui-entrepreneurship__layout">
          <EntrepreneurshipJourney
            stages={entrepreneurshipStages}
            activeId={activeId}
            onSelectStage={handleSelectStage}
            scrollProgress={scrollYProgress}
            isMobile={isMobile}
          />

          <EntrepreneurshipDetails stage={activeStage} />
        </div>
      </Container>
    </section>
  )
}

export default Entrepreneurship
