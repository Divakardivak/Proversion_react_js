import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowDown, ChevronRight, Award, Users, BookOpen } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { MagneticButton } from '@/components/common/MagneticButton'
import { HeroScene } from './HeroScene'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { fadeUp, staggerChildren } from '@/animations/variants'
import './Hero.css'

/**
 * Check if WebGL is supported in the current environment.
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Hero Section Component
 * Features large typography, Framer Motion text reveals, CTAs, trust metrics,
 * and an immersive 3D technology ecosystem scene with WebGL fallback.
 */
export function Hero() {
  const [webglSupported, setWebglSupported] = useState(true)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setWebglSupported(isWebGLAvailable())
  }, [])

  const containerVariants = shouldReduceMotion ? {} : staggerChildren
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <section id="home" className="ui-hero" aria-label="Introduction">
      {/* Background Ambient Glows */}
      <div className="ui-hero__bg-glow-primary" aria-hidden="true" />
      <div className="ui-hero__bg-glow-secondary" aria-hidden="true" />

      <Container size="xl">
        <div className="ui-hero__grid">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            className="ui-hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hero Eyebrow Badge */}
            <motion.div className="ui-hero__badge" variants={itemVariants}>
              <Sparkles size={14} />
              <span>Learn Like A Pro</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 className="ui-hero__headline" variants={itemVariants}>
              <span className="ui-hero__headline-line">EMPOWER</span>
              <span className="ui-hero__headline-line">YOUR</span>
              <span className="ui-hero__headline-line text-gradient-brand">
                FUTURE
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p className="ui-hero__description" variants={itemVariants}>
              Bridge the gap between academic learning and industry demands.
              Master cutting-edge technologies through practical training,
              real-time MNC projects, and veteran mentorship.
            </motion.p>

            {/* Action Buttons */}
            <motion.div className="ui-hero__actions" variants={itemVariants}>
              <MagneticButton strength={0.2}>
                <Button
                  variant="primary"
                  size="lg"
                  href="#programs"
                  icon={<ChevronRight size={18} />}
                  iconPosition="right"
                >
                  Explore Programs
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Button
                  variant="glass"
                  size="lg"
                  href="#contact"
                >
                  Start Your Journey
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Metrics Trust Pill */}
            <motion.div className="ui-hero__metrics" variants={itemVariants}>
              <div className="ui-hero__metric-item">
                <BookOpen size={14} color="var(--accent-cyan)" />
                <span>
                  <strong className="ui-hero__metric-highlight">12+</strong> Programs
                </span>
              </div>

              <span className="ui-hero__metric-dot" aria-hidden="true" />

              <div className="ui-hero__metric-item">
                <Users size={14} color="var(--accent-primary)" />
                <span>
                  <strong className="ui-hero__metric-highlight">10+ Yr.</strong> Mentors
                </span>
              </div>

              <span className="ui-hero__metric-dot" aria-hidden="true" />

              <div className="ui-hero__metric-item">
                <Award size={14} color="var(--accent-emerald)" />
                <span>
                  <strong className="ui-hero__metric-highlight">100%</strong> Placement Focus
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Scene or WebGL Fallback */}
          <div className="ui-hero__scene-wrapper" aria-hidden="true">
            {webglSupported ? (
              <HeroScene isMobile={isMobile} />
            ) : (
              <div className="ui-hero__fallback">
                <div className="ui-hero__fallback-rings">
                  <div className="ui-hero__fallback-ring ui-hero__fallback-ring--1" />
                  <div className="ui-hero__fallback-ring ui-hero__fallback-ring--2" />
                  <div className="ui-hero__fallback-ring ui-hero__fallback-ring--3" />
                  <div className="ui-hero__fallback-core" />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Scroll to Explore Indicator */}
      <a
        href="#about"
        className="ui-hero__scroll-indicator"
        aria-label="Scroll down to explore ProVersion"
      >
        <span className="ui-hero__scroll-text">Scroll to explore</span>
        <ArrowDown size={14} className="ui-hero__scroll-chevron" />
      </a>
    </section>
  )
}

export default Hero
