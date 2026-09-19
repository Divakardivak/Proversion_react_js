import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import logoSrc from '@/assets/proversion-logo.png'
import './AnimatedLogo.css'

/**
 * AnimatedLogo Component
 * Features a multi-layer 3D extrusion, mouse-driven tilt parallax (desktop only),
 * subtle light sweep highlight, ambient breathing glow, and orbiting energy particles.
 *
 * @param {Object} props
 * @param {'small' | 'medium' | 'large' | number} [props.size='small'] - Logo size preset or pixel value
 * @param {'navbar' | 'hero' | 'footer'} [props.variant='navbar'] - Display variant
 * @param {boolean} [props.interactive=true] - Enable 3D tilt and hover physics
 * @param {string} [props.className=''] - Additional class names
 * @param {() => void} [props.onClick] - Click handler
 */
export function AnimatedLogo({
  size = 'small',
  variant = 'navbar',
  interactive = true,
  className = '',
  onClick,
}) {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTouch = useMediaQuery('(pointer: coarse)')

  // Size styling
  const sizeClass = typeof size === 'string' ? `ui-logo--${size}` : ''
  const customStyle =
    typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : {}

  // 3D Tilt MotionValues (zero React re-renders)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 280, damping: 22, mass: 0.1 }
  const rotateX = useSpring(mouseY, springConfig)
  const rotateY = useSpring(mouseX, springConfig)

  // Max tilt angle (degrees)
  const maxTilt = variant === 'hero' ? 6 : 4

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || isTouch || isMobile || !interactive) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    // Normalized coordinates from center: -0.5 to +0.5
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5

    // Invert Y for natural 3D tilt
    mouseX.set(xPct * maxTilt * 2)
    mouseY.set(-yPct * maxTilt * 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Entrance animation variants
  const entranceVariants = {
    hidden: {
      scale: 0.75,
      opacity: 0,
      filter: 'blur(8px)',
    },
    visible: {
      scale: [0.75, 1.05, 1.0],
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: shouldReduceMotion ? 0.3 : 1.2,
        times: [0, 0.7, 1],
        ease: [0.19, 1, 0.22, 1],
      },
    },
  }

  const isHero = variant === 'hero'

  return (
    <motion.div
      ref={containerRef}
      className={`ui-logo ${sizeClass} ${
        interactive ? 'ui-logo--interactive' : ''
      } ${isHero && !shouldReduceMotion ? 'ui-logo--floating' : ''} ${className}`}
      style={customStyle}
      initial="hidden"
      animate="visible"
      variants={entranceVariants}
      whileHover={
        interactive && !shouldReduceMotion
          ? { scale: 1.04, transition: { duration: 0.35, ease: 'easeOut' } }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* 3D Rotational Scene (Driven by Framer Springs directly) */}
      <motion.div
        className="ui-logo__scene"
        style={{
          rotateX: shouldReduceMotion || isTouch ? 0 : rotateX,
          rotateY: shouldReduceMotion || isTouch ? 0 : rotateY,
        }}
      >
        {/* Soft Ambient Breathing Glow */}
        <div
          className={`ui-logo__glow ${
            !shouldReduceMotion ? 'ui-logo__glow--breathing' : ''
          }`}
          aria-hidden="true"
        />

        {/* 5 Layered 3D Depth Steps (Extrusion effect) */}
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          className="ui-logo__depth-layer ui-logo__depth-layer--5"
          draggable="false"
        />
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          className="ui-logo__depth-layer ui-logo__depth-layer--4"
          draggable="false"
        />
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          className="ui-logo__depth-layer ui-logo__depth-layer--3"
          draggable="false"
        />
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          className="ui-logo__depth-layer ui-logo__depth-layer--2"
          draggable="false"
        />
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          className="ui-logo__depth-layer ui-logo__depth-layer--1"
          draggable="false"
        />

        {/* Main Crisp Foreground Layer */}
        <div className="ui-logo__front-layer">
          <img
            src={logoSrc}
            alt="ProVersion Official Logo"
            className="ui-logo__img"
            draggable="false"
          />

          {/* Periodic Light Sweep Highlight */}
          {!shouldReduceMotion && (
            <div className="ui-logo__light-sweep" aria-hidden="true" />
          )}
        </div>

        {/* Orbiting Particles (Hero Variant Only) */}
        {isHero && !shouldReduceMotion && (
          <div className="ui-logo__particles-container" aria-hidden="true">
            {/* Outer Orbit Track */}
            <div
              className="ui-logo__orbit-track"
              style={{ animationDuration: '14s' }}
            >
              <span className="ui-logo__particle ui-logo__particle--1" />
              <span className="ui-logo__particle ui-logo__particle--2" />
              <span className="ui-logo__particle ui-logo__particle--3" />
              <span className="ui-logo__particle ui-logo__particle--4" />
            </div>

            {/* Inner Counter-Orbit Track (Desktop has 4 more particles) */}
            {!isMobile && (
              <div
                className="ui-logo__orbit-track"
                style={{
                  animationDuration: '9s',
                  animationDirection: 'reverse',
                }}
              >
                <span className="ui-logo__particle ui-logo__particle--5" />
                <span className="ui-logo__particle ui-logo__particle--6" />
                <span className="ui-logo__particle ui-logo__particle--7" />
                <span className="ui-logo__particle ui-logo__particle--8" />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default AnimatedLogo
