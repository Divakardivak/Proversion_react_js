/**
 * Framer Motion Transition Configurations & Easings
 */

export const easings = {
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  springGentle: { type: 'spring', stiffness: 120, damping: 20 },
  springSnappy: { type: 'spring', stiffness: 300, damping: 28 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 15 },
}

export const transitions = {
  instant: {
    duration: 0.1,
    ease: easings.easeOutQuad,
  },
  fast: {
    duration: 0.25,
    ease: easings.easeOutCubic,
  },
  normal: {
    duration: 0.4,
    ease: easings.easeOutCubic,
  },
  slow: {
    duration: 0.6,
    ease: easings.easeOutExpo,
  },
  smooth: {
    duration: 0.8,
    ease: easings.easeOutExpo,
  },
  gentle: {
    duration: 1.0,
    ease: easings.easeOutExpo,
  },
  spring: easings.springSnappy,
  springGentle: easings.springGentle,
}

export default transitions
