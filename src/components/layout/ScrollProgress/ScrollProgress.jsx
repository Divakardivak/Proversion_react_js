import { motion, useScroll } from 'framer-motion'
import './ScrollProgress.css'

/**
 * ScrollProgress indicator
 * Displays a thin gradient bar at the top edge of the viewport tracking scroll progress.
 * Uses Framer Motion MotionValue directly to avoid any React component re-renders during scrolling.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div
      className="ui-scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
    >
      <motion.div
        className="ui-scroll-progress__bar"
        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
      />
    </div>
  )
}

export default ScrollProgress
