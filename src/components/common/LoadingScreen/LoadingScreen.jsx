import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './LoadingScreen.css'

/**
 * Premium Loading Screen experience for ProVersion.
 * Displays brand entrance with animated progress line, then gracefully exits.
 * @param {Object} props
 * @param {() => void} props.onComplete - Callback triggered when loading completes
 */
export function LoadingScreen({ onComplete }) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Lock body scrolling while loading screen is visible
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Allow user to clearly see the progress bar and brand entrance
    const duration = shouldReduceMotion ? 1400 : 1900
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, duration)

    return () => {
      document.body.style.overflow = originalOverflow
      clearTimeout(timer)
    }
  }, [onComplete, shouldReduceMotion])

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      y: -24,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  }

  const textVariants = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' },
        },
      }

  const lineVariants = shouldReduceMotion
    ? { initial: { scaleX: 1 }, animate: { scaleX: 1 } }
    : {
        initial: { scaleX: 0 },
        animate: {
          scaleX: 1,
          transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] },
        },
      }

  return (
    <motion.div
      className="ui-loading-screen"
      variants={containerVariants}
      initial="initial"
      exit="exit"
      role="status"
      aria-label="Loading ProVersion experience"
    >
      <div className="ui-loading-screen__background" />

      <div className="ui-loading-screen__content">
        <motion.div
          className="ui-loading-screen__brand"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <span className="ui-loading-screen__brand-pro">PRO</span>
          <span className="ui-loading-screen__brand-version">VERSION</span>
        </motion.div>

        <div className="ui-loading-screen__line">
          <motion.div
            className="ui-loading-screen__progress"
            variants={lineVariants}
            initial="initial"
            animate="animate"
          />
        </div>

        <motion.span
          className="ui-loading-screen__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          The Next Generation of Tech Learning
        </motion.span>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
