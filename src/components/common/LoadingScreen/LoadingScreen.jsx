import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import logoSrc from '@/assets/proversion-logo.png'
import './LoadingScreen.css'

/**
 * Cinematic logo reveal component:
 *  1. A gradient ring (violet → lavender → gold) draws itself around the logo
 *  2. The logo PNG materialises from a bright blur flash with elastic overshoot
 *  3. 8 spark particles burst outward the instant the logo appears
 *  4. Ambient floating dust particles drift in the background
 */
function ProVersionLoaderLogo({ reduceMotion }) {
  return (
    <div className="ui-loading-logo-wrap">
      {/* ── Ambient background particles ────────────────── */}
      {!reduceMotion && (
        <div className="ui-loading-particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`ui-loading-particle ui-loading-particle--${i + 1}`} />
          ))}
        </div>
      )}

      {/* ── Glowing SVG ring that draws around the logo ── */}
      <svg
        className="ui-loading-ring"
        viewBox="0 0 220 220"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          {/* Ring gradient: sapphire → sky blue → gold */}
          <linearGradient id="pvRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="55%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>

          {/* Soft glow filter on the ring */}
          <filter id="pvRingGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle track ring (always visible) */}
        <circle
          cx="110" cy="110" r="96"
          stroke="rgba(37, 99, 235, 0.16)"
          strokeWidth="1.5"
        />

        {/* Animated progress ring — draws from top clockwise */}
        <circle
          className={`ui-loading-ring__arc${reduceMotion ? ' ui-loading-ring__arc--instant' : ''}`}
          cx="110" cy="110" r="96"
          stroke="url(#pvRingGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#pvRingGlow)"
        />
      </svg>

      {/* ── Logo image + flash overlay ───────────────────── */}
      <div className={`ui-loading-logo-img-wrap${!reduceMotion ? ' animated' : ''}`}>
        <img
          src={logoSrc}
          alt="ProVersion Logo"
          className="ui-loading-logo-img"
          draggable="false"
        />
        {/* Bright gold flash that blooms and fades on entry */}
        {!reduceMotion && (
          <span className="ui-loading-logo-flash" aria-hidden="true" />
        )}
      </div>

      {/* ── Spark burst (8 particles, 8 directions) ──────── */}
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
 * Displays a cinematic logo entrance, then gracefully exits via Framer Motion.
 * @param {{ onComplete: () => void }} props
 */
export function LoadingScreen({ onComplete }) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Total duration: ring (1.5s) + logo (0.65s) + exit buffer = ~2.4s
    const duration = shouldReduceMotion ? 1400 : 4200
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, duration)

    return () => {
      document.body.style.overflow = originalOverflow
      clearTimeout(timer)
    }
  }, [onComplete, shouldReduceMotion])

  const exitVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.65,
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
      aria-label="Loading ProVersion experience"
    >
      <div className="ui-loading-screen__background" />

      <div className="ui-loading-screen__content">

        {/* Cinematic logo reveal */}
        <ProVersionLoaderLogo reduceMotion={shouldReduceMotion} />

        {/* Brand name slides up after logo settles */}
        <motion.div
          className="ui-loading-screen__brand"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="ui-loading-screen__brand-pro">PRO</span>
          <span className="ui-loading-screen__brand-version">VERSION</span>
        </motion.div>

        {/* Progress bar sweeps in */}
        <div className="ui-loading-screen__line">
          <motion.div
            className="ui-loading-screen__progress"
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 2.8, ease: [0.25, 1, 0.5, 1] }}
          />
        </div>

        <motion.span
          className="ui-loading-screen__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
        >
          The Next Generation of Tech Learning
        </motion.span>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
