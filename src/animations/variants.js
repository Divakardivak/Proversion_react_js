import { transitions, easings } from './transitions'

/**
 * Standard Framer Motion Animation Variants
 */

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration || 0.5,
      delay: custom.delay || 0,
      ease: easings.easeOutCubic,
    },
  }),
}

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: easings.easeOutExpo,
    },
  }),
}

export const fadeDown = {
  hidden: { opacity: 0, y: -32 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: easings.easeOutExpo,
    },
  }),
}

export const fadeLeft = {
  hidden: { opacity: 0, x: 32 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: easings.easeOutExpo,
    },
  }),
}

export const fadeRight = {
  hidden: { opacity: 0, x: -32 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: easings.easeOutExpo,
    },
  }),
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration || 0.5,
      delay: custom.delay || 0,
      ease: easings.easeOutExpo,
    },
  }),
}

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
  visible: (custom = {}) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: custom.duration || 0.7,
      delay: custom.delay || 0,
      ease: easings.easeOutExpo,
    },
  }),
}

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.stagger || 0.1,
      delayChildren: custom.delay || 0.1,
    },
  }),
}

export const textReveal = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: (custom = {}) => ({
    opacity: 1,
    y: '0%',
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: easings.easeOutExpo,
    },
  }),
}

export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
      staggerChildren: 0.15,
    },
  },
}

export const cardHover = {
  initial: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  },
  hover: {
    y: -6,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 0 24px -4px rgba(99, 102, 241, 0.35)',
    transition: {
      duration: 0.3,
      ease: easings.easeOutCubic,
    },
  },
}

export const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    clipPath: 'inset(10% 10% 10% 10%)',
  },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: custom.duration || 0.9,
      delay: custom.delay || 0,
      ease: easings.easeOutExpo,
    },
  }),
}
