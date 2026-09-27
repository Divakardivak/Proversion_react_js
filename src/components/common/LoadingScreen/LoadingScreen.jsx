import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import proversionEmblem from '@/assets/proversion-emblem.jpg'
import './LoadingScreen.css'

/**
 * Realistic Cinematic ProVersion Loader Logo Component:
 * - Real 3D squircle emblem card matching authentic official brand identity (P + golden v)
 * - Dual counter-rotating neon gradient arcs (sapphire blue & golden amber)
 * - Holographic specular shine sweep across the emblem surface
 * - 8 radial particle bursts on lock-in
 */
function ProVersionLoaderEmblem({ reduceMotion }) {
  return (
    <div className="ui-loading-emblem-wrap">
      {/* ── Ambient background dust particles ── */}
      {!reduceMotion && (
        <div className="ui-loading-particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`ui-loading-particle ui-loading-particle--${i + 1}`} />
          ))}
        </div>
      )}

      {/* ── Dual Orbital Energy Rings around the emblem ── */}
      <svg
        className="ui-loading-ring"
        viewBox="0 0 240 240"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pvRingGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="pvRingGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="pvGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient track circles */}
        <circle
          cx="120" cy="120" r="105"
          stroke="rgba(37, 99, 235, 0.12)"
          strokeWidth="1.5"
        />
        <circle
          cx="120" cy="120" r="92"
          stroke="rgba(245, 158, 11, 0.1)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Outer Animated Ring (Clockwise) */}
        <circle
          className={`ui-loading-ring__arc${reduceMotion ? ' ui-loading-ring__arc--instant' : ''}`}
          cx="120" cy="120" r="105"
          stroke="url(#pvRingGrad1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#pvGlow)"
        />

        {/* Inner Animated Ring (Counter-Clockwise) */}
        {!reduceMotion && (
          <circle
            className="ui-loading-ring__arc-inner"
            cx="120" cy="120" r="92"
            stroke="url(#pvRingGrad2)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* ── Real 3D Emblem Card with specular shine ── */}
      <div className={`ui-loading-emblem-card${!reduceMotion ? ' animated' : ''}`}>
        <div className="ui-loading-emblem-inner">
          <img
            src={proversionEmblem}
            alt="ProVersion Official Logo"
            className="ui-loading-emblem-img"
            draggable="false"
          />
          {/* Specular Diagonal Light Sweep */}
          {!reduceMotion && <span className="ui-loading-emblem-shine" aria-hidden="true" />}
          {/* Edge Rim Highlight */}
          <span className="ui-loading-emblem-rim" aria-hidden="true" />
        </div>
      </div>

      {/* ── Golden spark burst (8 directions) ── */}
      {!reduceMotion && (
        <div className="ui-loading-sparks" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={`ui-loading-spark ui-loading-spark--${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Premium Loading Screen for ProVersion.
 * Displays a cinematic real emblem logo entrance, live progress counter, and then gracefully exits.
 * @param {{ onComplete: () => void }} props
 */
export function LoadingScreen({ onComplete }) {
  const shouldReduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Smooth numerical progress increment from 0 to 100 over ~2.4s
    const duration = shouldReduceMotion ? 1200 : 2400
    const intervalTime = 30
    const totalSteps = duration / intervalTime
    let currentStep = 0

    const progressTimer = setInterval(() => {
      currentStep++
      const pct = Math.min(100, Math.round((currentStep / totalSteps) * 100))
      setProgress(pct)
      if (currentStep >= totalSteps) {
        clearInterval(progressTimer)
      }
    }, intervalTime)

    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, duration + 200)

    return () => {
      document.body.style.overflow = originalOverflow
      clearInterval(progressTimer)
      clearTimeout(timer)
    }
  }, [onComplete, shouldReduceMotion])

  const exitVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: {
        duration: shouldReduceMotion ? 0.25 : 0.55,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  }

  return (
    <motion.div
      className="ui-loading-screen"
      variants={exitVariants}
      initial="initial"
      exit="exit"
      role="status"
      aria-label="Loading ProVersion platform"
    >
      <div className="ui-loading-screen__background" />

      <div className="ui-loading-screen__content">
        {/* Real Logo Emblem with 3D Cinematic Animation */}
        <ProVersionLoaderEmblem reduceMotion={shouldReduceMotion} />

        {/* Brand name slides up and expands */}
        <motion.div
          className="ui-loading-screen__brand"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="ui-loading-screen__brand-pro">PRO</span>
          <span className="ui-loading-screen__brand-version">VERSION</span>
        </motion.div>

        {/* Progress Bar & Percentage Counter */}
        <div className="ui-loading-screen__progress-container">
          <div className="ui-loading-screen__line">
            <div
              className="ui-loading-screen__progress"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="ui-loading-screen__progress-meta">
            <span className="ui-loading-screen__progress-status">INITIALIZING EXPERIENCE</span>
            <span className="ui-loading-screen__progress-pct">{progress}%</span>
          </div>
        </div>

        <motion.span
          className="ui-loading-screen__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          The Next Generation of Tech Learning
        </motion.span>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
