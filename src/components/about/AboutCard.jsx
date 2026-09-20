import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Target, Eye, Compass } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const ICON_MAP = {
  Target,
  Eye,
  Compass,
}

/**
 * Refined AboutCard component
 * Immersive floating panel with 3D perspective tilt, clear typographic hierarchy,
 * and subtle hover elevation.
 * @param {Object} props
 * @param {Object} props.pillar - Pillar data (title, tagline, description, accent, icon)
 * @param {number} props.index - Index in the card stack
 */
export function AboutCard({ pillar, index }) {
  const cardRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Motion values for smooth 3D cursor tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 280, damping: 22 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig)

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const IconComponent = ICON_MAP[pillar.icon] || Target

  return (
    <motion.div
      ref={cardRef}
      className="ui-about-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? {}
          : {
              rotateX,
              rotateY,
            }
      }
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.65,
        delay: index * 0.16,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      {/* Background Accent Luminescence */}
      <div
        className="ui-about-card__glow"
        style={{
          background: `radial-gradient(circle at 60% 0%, ${pillar.accent}24 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="ui-about-card__content"
      >
        {/* Card Header: Icon + Pillar Badge + Title */}
        <div className="ui-about-card__header">
          <div
            className="ui-about-card__icon-wrapper"
            style={{
              borderColor: `${pillar.accent}44`,
              color: pillar.accent,
              background: `radial-gradient(circle, ${pillar.accent}18 0%, transparent 75%)`,
              boxShadow: `0 0 16px ${pillar.accent}22`,
            }}
          >
            <IconComponent size={22} />
          </div>

          <div className="ui-about-card__title-group">
            <span
              className="ui-about-card__badge"
              style={{
                color: pillar.accent,
                borderColor: `${pillar.accent}33`,
              }}
            >
              Pillar 0{index + 1}
            </span>
            <h3 className="ui-about-card__title">{pillar.title}</h3>
          </div>
        </div>

        {/* Short Lead: High-Contrast Tagline */}
        <p className="ui-about-card__lead" style={{ color: pillar.accent }}>
          {pillar.tagline}
        </p>

        {/* Supporting Description */}
        <p className="ui-about-card__description">{pillar.description}</p>
      </div>
    </motion.div>
  )
}

export default AboutCard
