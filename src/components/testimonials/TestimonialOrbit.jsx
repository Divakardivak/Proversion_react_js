import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { TestimonialCard } from './TestimonialCard'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Enhanced 3D TestimonialOrbit Component.
 * Implements a true 3D spatial coverflow carousel with mouse-wheel scroll,
 * drag-swipe physics, depth scaling, 3D Y-axis rotation, and spotlight illumination.
 * @param {Object} props
 * @param {Array<Object>} props.testimonials - All testimonial data
 * @param {number} props.currentIndex - Active testimonial index
 * @param {(idx: number) => void} props.onSelectIndex - Direct selection handler
 * @param {() => void} props.onPrev - Previous handler
 * @param {() => void} props.onNext - Next handler
 * @param {boolean} [props.isMobile=false]
 */
export function TestimonialOrbit({
  testimonials,
  currentIndex,
  onSelectIndex,
  onPrev,
  onNext,
  isMobile = false,
}) {
  const shouldReduceMotion = useReducedMotion()
  const total = testimonials.length
  const lastScrollTime = useRef(0)

  const activeTestimonial = testimonials[currentIndex] || testimonials[0]

  // Mouse wheel / trackpad 3D scroll interaction
  const handleWheel = useCallback(
    (e) => {
      // Detect horizontal or vertical wheel movement
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) < 18) return

      const now = Date.now()
      if (now - lastScrollTime.current < 380) return // debounce to prevent rapid multi-card skipping

      if (delta > 0) {
        onNext()
        lastScrollTime.current = now
      } else {
        onPrev()
        lastScrollTime.current = now
      }
    },
    [onNext, onPrev]
  )

  // Handle drag gesture completion on the active card
  const handleDragEnd = (_, info) => {
    const threshold = 40
    if (info.offset.x < -threshold || info.velocity.x < -200) {
      onNext()
    } else if (info.offset.x > threshold || info.velocity.x > 200) {
      onPrev()
    }
  }

  return (
    <div
      className="ui-testimonial-orbit"
      role="region"
      aria-label="Student Testimonials 3D Orbit"
      onWheel={handleWheel}
    >
      {/* 3D Ambient Floor Spotlight Glow */}
      <div
        className="ui-testimonial-orbit__spotlight"
        style={{
          background: `radial-gradient(ellipse 65% 40% at 50% 85%, ${activeTestimonial.accentColor}33 0%, rgba(255, 184, 28, 0.08) 45%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 3D Spatial Carousel Stage */}
      <div className="ui-testimonial-orbit__stage">
        {testimonials.map((item, index) => {
          // Calculate shortest circular modular offset
          let offset = index - currentIndex
          if (offset > total / 2) offset -= total
          if (offset < -total / 2) offset += total

          const isCenter = offset === 0
          const absOffset = Math.abs(offset)
          const xSpacing = isMobile ? 270 : 340

          // Calculate 3D spatial properties
          const xPos = offset * xSpacing
          const scale = isCenter ? 1 : absOffset === 1 ? 0.84 : 0.68
          const rotateY = isCenter ? 0 : offset < 0 ? 26 : -26
          const zIndex = 10 - absOffset
          const zDepth = isCenter ? 40 : -80
          const opacity = isCenter ? 1 : absOffset === 1 ? (isMobile ? 0 : 0.45) : 0
          const blurAmount = isCenter ? 0 : 2.5

          return (
            <motion.div
              key={item.id}
              className={`ui-testimonial-orbit__item ${isCenter ? 'ui-testimonial-orbit__item--center' : 'ui-testimonial-orbit__item--flank'
                }`}
              animate={
                shouldReduceMotion
                  ? { opacity: isCenter ? 1 : 0, scale: isCenter ? 1 : 0.95 }
                  : {
                    x: xPos,
                    scale,
                    rotateY,
                    z: zDepth,
                    opacity,
                    filter: `blur(${blurAmount}px)`,
                  }
              }
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 28,
              }}
              style={{
                zIndex,
                pointerEvents: absOffset > 1 || (isMobile && !isCenter) ? 'none' : 'auto',
              }}
              drag={isCenter ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.24}
              onDragEnd={isCenter ? handleDragEnd : undefined}
              onClick={() => {
                if (!isCenter) onSelectIndex(index)
              }}
            >
              <TestimonialCard
                testimonial={item}
                isActive={isCenter}
                position={isCenter ? 'center' : offset < 0 ? 'left' : 'right'}
                onSelect={() => onSelectIndex(index)}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default TestimonialOrbit
