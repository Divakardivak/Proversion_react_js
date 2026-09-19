import { useState, useEffect, useCallback, useRef } from 'react'
import { useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { testimonialsHeader, testimonialsData } from '@/data/testimonials'
import { TestimonialOrbit } from './TestimonialOrbit'
import { TestimonialNavigation } from './TestimonialNavigation'
import { Container } from '@/components/common/Container'
import { Reveal } from '@/components/common/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Testimonials.css'

/**
 * Main Testimonials Section Component.
 * Implements the "Testimonial Orbit / Floating Stories" experience
 * with auto-rotation, hover/focus pause, touch swipe, and keyboard controls.
 */
export function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { margin: '100px 0px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const timerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const total = testimonialsData.length

  // Track responsive mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const handleSelectIndex = useCallback((idx) => {
    setCurrentIndex(idx)
  }, [])

  // Auto-rotation (6 seconds), pausing on hover, focus, offscreen, or hidden tab
  useEffect(() => {
    if (shouldReduceMotion || isHovered || isFocused || !isInView) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        timerRef.current = setInterval(() => {
          handleNext()
        }, 6000)
      }
    }

    startTimer()

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (timerRef.current) clearInterval(timerRef.current)
      } else {
        startTimer()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [shouldReduceMotion, isHovered, isFocused, isInView, handleNext])

  // Keyboard navigation when user is interacting with the section
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="ui-testimonials"
      aria-label="ProVersion Student Reviews & Success Stories"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Warm Ambient Background Lighting */}
      <div className="ui-testimonials__bg-glow" aria-hidden="true" />
      <div className="ui-testimonials__bg-glow-right" aria-hidden="true" />

      <Container size="xl">
        {/* Section Header */}
        <div className="ui-testimonials__header">
          <Reveal direction="down" distance={20} duration={0.6}>
            <span className="ui-testimonials__badge">
              <Sparkles size={13} />
              {testimonialsHeader.badge}
            </span>
          </Reveal>

          <Reveal direction="up" distance={30} duration={0.7} delay={0.1}>
            <h2 className="ui-testimonials__title">{testimonialsHeader.title}</h2>
          </Reveal>

          <Reveal direction="up" distance={30} duration={0.7} delay={0.2}>
            <p className="ui-testimonials__tagline">{testimonialsHeader.subtitle}</p>
          </Reveal>
        </div>

        {/* 3D Testimonial Orbit */}
        <TestimonialOrbit
          testimonials={testimonialsData}
          currentIndex={currentIndex}
          onSelectIndex={handleSelectIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          isMobile={isMobile}
        />

        {/* Accessible Navigation Controls */}
        <TestimonialNavigation
          currentIndex={currentIndex}
          totalCount={total}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Container>
    </section>
  )
}

export default Testimonials
