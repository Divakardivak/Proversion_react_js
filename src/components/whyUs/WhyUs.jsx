import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  Coins,
  Target,
  Layers,
  Cpu,
  Rocket,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { WhyUsNode } from './WhyUsNode'
import { whyUsData } from '@/data/company'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { fadeUp, staggerChildren } from '@/animations/variants'
import './WhyUs.css'

const pillarIcons = {
  ascend: Layers,
  evolve: Cpu,
  propel: Rocket,
}

const metricIcons = {
  Users,
  Clock,
  Coins,
  Target,
}

/**
 * Why Choose Us Section
 * Interactive connected technology ecosystem (ASCEND, EVOLVE, PROPEL)
 * with animated network lines, responsive central anchor, and dynamic content transitions.
 */
export function WhyUs() {
  const [activeNodeId, setActiveNodeId] = useState('ascend')
  const shouldReduceMotion = useReducedMotion()

  const activePillar =
    whyUsData.pillars.find((p) => p.id === activeNodeId) || whyUsData.pillars[0]

  const ActiveIcon = pillarIcons[activePillar.id] || Layers
  const containerVariants = shouldReduceMotion ? {} : staggerChildren
  const itemVariants = shouldReduceMotion ? {} : fadeUp

  return (
    <section id="why-us" className="ui-why-us" aria-label="Why Choose ProVersion">
      {/* Background Ambient Lighting & Matrix Grid */}
      <div className="ui-why-us__bg-glow" aria-hidden="true" />
      <div className="ui-why-us__bg-glow-left" aria-hidden="true" />
      <div className="ui-why-us__grid-pattern" aria-hidden="true" />

      <Container size="xl">
        {/* Section Header */}
        <motion.div
          className="ui-why-us__header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="ui-why-us__badge" variants={itemVariants}>
            <Sparkles size={13} />
            <span>{whyUsData.eyebrow}</span>
          </motion.div>

          <motion.h2 className="ui-why-us__title" variants={itemVariants}>
            Structured Skill-Development{' '}
            <span className="text-gradient-brand">Model</span>
          </motion.h2>

          <motion.p className="ui-why-us__tagline" variants={itemVariants}>
            {whyUsData.tagline}
          </motion.p>
        </motion.div>

        {/* Interactive 3D Technology Ecosystem Diagram */}
        <div
          className="ui-why-us__diagram"
          role="region"
          aria-label="Interactive skill development model"
          style={{
            '--active-color': activePillar.color,
          }}
        >
          {/* SVG Animated Connection Conduits */}
          <svg className="ui-why-us__svg" viewBox="0 0 960 440" aria-hidden="true">
            <defs>
              <linearGradient id="whyUsGradAscend" x1="480" y1="220" x2="480" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFB81C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="whyUsGradEvolve" x1="480" y1="220" x2="275" y2="330" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFB81C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="whyUsGradPropel" x1="480" y1="220" x2="685" y2="330" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFB81C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFB81C" stopOpacity="0.95" />
              </linearGradient>
              <filter id="whyUsGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Background Conduits */}
            <line x1="480" y1="220" x2="480" y2="120" className="ui-why-us__line-base" />
            <line x1="480" y1="220" x2="275" y2="330" className="ui-why-us__line-base" />
            <line x1="480" y1="220" x2="685" y2="330" className="ui-why-us__line-base" />

            {/* Conduit Terminal Port Rings */}
            <circle cx="480" cy="120" r="4.5" className="ui-why-us__port ui-why-us__port--ascend" />
            <circle cx="275" cy="330" r="4.5" className="ui-why-us__port ui-why-us__port--evolve" />
            <circle cx="685" cy="330" r="4.5" className="ui-why-us__port ui-why-us__port--propel" />

            {/* Active Luminous Laser Lines */}
            <line
              x1="480"
              y1="220"
              x2="480"
              y2="120"
              stroke="url(#whyUsGradAscend)"
              className={`ui-why-us__line ${activeNodeId === 'ascend' ? 'ui-why-us__line--active' : ''}`}
            />
            <line
              x1="480"
              y1="220"
              x2="275"
              y2="330"
              stroke="url(#whyUsGradEvolve)"
              className={`ui-why-us__line ${activeNodeId === 'evolve' ? 'ui-why-us__line--active' : ''}`}
            />
            <line
              x1="480"
              y1="220"
              x2="685"
              y2="330"
              stroke="url(#whyUsGradPropel)"
              className={`ui-why-us__line ${activeNodeId === 'propel' ? 'ui-why-us__line--active' : ''}`}
            />

            {/* Energy Photons Traveling along active conduit */}
            {!shouldReduceMotion && activeNodeId === 'ascend' && (
              <circle r="4.5" fill="#38BDF8" filter="url(#whyUsGlow)">
                <animateMotion path="M 480 220 L 480 120" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}
            {!shouldReduceMotion && activeNodeId === 'evolve' && (
              <circle r="4.5" fill="#818CF8" filter="url(#whyUsGlow)">
                <animateMotion path="M 480 220 L 275 330" dur="1.4s" repeatCount="indefinite" />
              </circle>
            )}
            {!shouldReduceMotion && activeNodeId === 'propel' && (
              <circle r="4.5" fill="#FFB81C" filter="url(#whyUsGlow)">
                <animateMotion path="M 480 220 L 685 330" dur="1.4s" repeatCount="indefinite" />
              </circle>
            )}
          </svg>

          {/* Central 3D Holographic Gyroscopic Core */}
          <div className="ui-why-us__center">
            <div
              className="ui-why-us__center-aura"
              style={{
                background: `radial-gradient(circle, ${activePillar.color}33 0%, rgba(255, 184, 28, 0.15) 50%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
            <div className="ui-why-us__center-ring ui-why-us__center-ring--1" aria-hidden="true" />
            <div className="ui-why-us__center-ring ui-why-us__center-ring--2" aria-hidden="true" />
            <div className="ui-why-us__center-ring ui-why-us__center-ring--3" aria-hidden="true" />

            <div className="ui-why-us__center-core">
              <div className="ui-why-us__center-spark" aria-hidden="true" />
              <div className="ui-why-us__center-badge">
                <span className="ui-why-us__center-title">
                  PRO<span className="ui-why-us__center-highlight">VERSION</span>
                </span>
                <span className="ui-why-us__center-sub">ECOSYSTEM HUB</span>
              </div>
            </div>
          </div>

          {/* Connected 3D Orbital Nodes */}
          {whyUsData.pillars.map((pillar) => (
            <WhyUsNode
              key={pillar.id}
              node={pillar}
              isActive={activeNodeId === pillar.id}
              isAnyActive={Boolean(activeNodeId)}
              onSelect={() => setActiveNodeId(pillar.id)}
              onHover={() => setActiveNodeId(pillar.id)}
            />
          ))}
        </div>

        {/* Telemetry Stage & Dynamic Detail Console */}
        <div className="ui-why-us__detail-panel">
          {/* Quick-Switch Telemetry Selector Bar */}
          <div className="ui-why-us__telemetry-bar">
            <div className="ui-why-us__telemetry-line" />
            <div className="ui-why-us__telemetry-nav" role="tablist" aria-label="Ecosystem pillars tabs">
              {whyUsData.pillars.map((pillar, idx) => {
                const stepNumber = pillar.step || String(idx + 1).padStart(2, '0')
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={activeNodeId === pillar.id}
                    className={`ui-why-us__nav-pill ${activeNodeId === pillar.id ? 'ui-why-us__nav-pill--active' : ''}`}
                    onClick={() => setActiveNodeId(pillar.id)}
                    style={{
                      '--pill-color': pillar.color,
                    }}
                  >
                    <span
                      className="ui-why-us__nav-dot"
                      style={{ backgroundColor: pillar.color }}
                    />
                    <span>
                      {stepNumber} · {pillar.name}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="ui-why-us__telemetry-line" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              id={`panel-${activePillar.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activePillar.id}`}
              className="ui-why-us__detail-card"
              style={{
                '--active-border': `${activePillar.color}66`,
                '--active-glow': `${activePillar.color}18`,
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="ui-why-us__detail-header">
                <div className="ui-why-us__detail-title-group">
                  <div
                    className="ui-why-us__detail-icon-wrap"
                    style={{
                      backgroundColor: `${activePillar.color}18`,
                      borderColor: `${activePillar.color}44`,
                      color: activePillar.color,
                    }}
                  >
                    <ActiveIcon size={22} />
                  </div>
                  <div>
                    <div className="ui-why-us__detail-phase">
                      <span>PHASE {activePillar.step || (activePillar.id === 'ascend' ? '01' : activePillar.id === 'evolve' ? '02' : '03')}</span>
                      <span className="ui-why-us__detail-phase-sep">/</span>
                      <span>{(activePillar.phase || (activePillar.id === 'ascend' ? 'Foundation' : activePillar.id === 'evolve' ? 'Execution' : 'Placement')).toUpperCase()} STAGE</span>
                    </div>
                    <h3 className="ui-why-us__detail-title">
                      {activePillar.name}
                    </h3>
                    <span
                      className="ui-why-us__detail-tagline"
                      style={{ color: activePillar.color }}
                    >
                      {activePillar.tagline}
                    </span>
                  </div>
                </div>

                <a
                  href="#programs"
                  className="ui-why-us__detail-cta"
                  style={{
                    '--btn-accent': activePillar.color,
                  }}
                >
                  <span>Explore Programs</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              <p className="ui-why-us__detail-desc">
                {activePillar.description}
              </p>

              <div className="ui-why-us__detail-metrics-header">
                <span>KEY ACCELERATION OUTCOMES:</span>
              </div>

              <div className="ui-why-us__detail-metrics">
                {activePillar.metrics.map((metric, i) => (
                  <span key={i} className="ui-why-us__metric-pill">
                    <CheckCircle2 size={14} color={activePillar.color} />
                    <span>{metric}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Supporting Ecosystem Metrics Grid */}
        <motion.div
          className="ui-why-us__metrics-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {whyUsData.ecosystemMetrics.map((item, index) => {
            const MetricIcon = metricIcons[item.icon] || (index === 0 ? Users : index === 1 ? Clock : index === 2 ? Coins : Target)
            return (
              <motion.div
                key={index}
                className="ui-why-us__metric-card"
                variants={itemVariants}
              >
                <div className="ui-why-us__metric-top">
                  <div className="ui-why-us__metric-icon-wrap">
                    <MetricIcon size={18} className="ui-why-us__metric-icon" />
                  </div>
                  <span className="ui-why-us__metric-tag">VERIFIED</span>
                </div>
                <div className="ui-why-us__metric-val text-gradient-brand">
                  {item.value}
                </div>
                <div className="ui-why-us__metric-label">{item.label}</div>
                <p className="ui-why-us__metric-detail">{item.detail}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}

export default WhyUs
