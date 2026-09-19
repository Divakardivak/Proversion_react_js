/**
 * Animation Presets & Viewport Trigger Configurations
 */

export const viewportPresets = {
  // Trigger once when 20% enters viewport
  standard: {
    once: true,
    amount: 0.2,
    margin: '0px 0px -50px 0px',
  },
  // Trigger once as soon as top reaches bottom edge
  early: {
    once: true,
    amount: 0.05,
    margin: '0px 0px -20px 0px',
  },
  // Trigger once when 40% enters
  deep: {
    once: true,
    amount: 0.4,
  },
  // Continuously animate in/out
  continuous: {
    once: false,
    amount: 0.2,
  },
}

/**
 * Fallback variants for users with prefers-reduced-motion: reduce
 */
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
  hover: {},
  tap: {},
}

export default {
  viewport: viewportPresets,
  reducedMotion: reducedMotionVariants,
}
