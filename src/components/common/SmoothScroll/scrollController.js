/**
 * Custom High-Refresh-Rate Smooth Scroll Controller Engine
 * Pure vanilla JavaScript module — zero React state, zero layout thrashing.
 *
 * Performance Optimizations for Google Chrome & High-Refresh Displays:
 * - Direct window.scrollTo(0, Math.round(currentScroll)) avoiding sub-pixel raster jitter
 * - Zero getComputedStyle/layout queries inside wheel handler (O(1) selector check)
 * - Optimized exponential response (RESPONSE = 18) for instantaneous, buttery response
 * - Delta normalized with crisp 1.15 multiplier to eliminate "stuck in molasses" feeling
 * - Maximum lead clamping to prevent runaway acceleration on aggressive spinning
 * - Sub-pixel snap threshold (< 0.5px) for crisp termination with zero idle RAF usage
 */

let currentScroll = typeof window !== 'undefined' ? window.scrollY : 0
let targetScroll = currentScroll
let isAnimating = false
let isProgrammaticScroll = false
let rafId = null
let lastTime = 0
let isReducedMotionActive = false

// Exponential smoothing response constant (18 = instantaneous start, buttery decay)
const RESPONSE = 18

// Wheel multiplier for comfortable notch travel without sluggish drag
const WHEEL_MULTIPLIER = 1.15

/**
 * Time-based exponential interpolation step
 * Mathematically consistent across 60Hz, 120Hz, 144Hz, 165Hz, and 240Hz
 */
function animate(currentTime) {
  if (!isAnimating) return

  // Calculate elapsed time in seconds; support high-refresh rates (144Hz=6.9ms, 165Hz=6.0ms, 240Hz=4.1ms)
  const dt = Math.max(0.001, Math.min((currentTime - lastTime) / 1000, 0.05))
  lastTime = currentTime

  // Frame-rate independent exponential interpolation
  const alpha = 1 - Math.exp(-RESPONSE * dt)
  currentScroll += (targetScroll - currentScroll) * alpha

  // Check sub-pixel threshold
  const diff = Math.abs(targetScroll - currentScroll)
  if (diff < 0.5) {
    currentScroll = targetScroll
    // Round to integer pixel boundary for zero raster-tile jitter in Chrome
    window.scrollTo(0, Math.round(currentScroll))
    isAnimating = false
    isProgrammaticScroll = false
    rafId = null
    document.documentElement.classList.remove('is-scrolling')
    return // Stop loop: zero CPU/GPU load while stationary
  }

  // Fast direct scroll to integer boundary
  window.scrollTo(0, Math.round(currentScroll))

  rafId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (!isAnimating) {
    isAnimating = true
    lastTime = performance.now()
    document.documentElement.classList.add('is-scrolling')
    rafId = requestAnimationFrame(animate)
  }
}

function stopAnimation() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  isAnimating = false
  isProgrammaticScroll = false
  document.documentElement.classList.remove('is-scrolling')
}

/**
 * Set reduced motion flag
 */
export function setReducedMotion(active) {
  isReducedMotionActive = Boolean(active)
}

/**
 * Programmatic Smooth Scroll API
 * @param {string | number | HTMLElement} target - CSS selector ('#contact'), pixel number, or element
 * @param {Object} [options]
 * @param {number} [options.offset=-90] - Offset in pixels for fixed navbar
 * @param {boolean} [options.immediate=false] - Skip animation
 */
export function smoothScrollTo(target, options = {}) {
  if (typeof window === 'undefined') return

  const offset = options.offset !== undefined ? options.offset : -90
  let destination = 0

  if (typeof target === 'number') {
    destination = target + offset
  } else if (typeof target === 'string') {
    if (target === '#' || target === '#home') {
      destination = 0
    } else {
      const element = document.querySelector(target)
      if (!element) return
      const rect = element.getBoundingClientRect()
      destination = window.scrollY + rect.top + offset
    }
  } else if (target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect()
    destination = window.scrollY + rect.top + offset
  }

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  destination = Math.max(0, Math.min(destination, maxScroll))

  if (options.immediate || isReducedMotionActive) {
    stopAnimation()
    currentScroll = destination
    targetScroll = destination
    window.scrollTo(0, Math.round(destination))
    return
  }

  currentScroll = window.scrollY
  targetScroll = destination
  isProgrammaticScroll = true
  startAnimation()
}

/**
 * Initialize event listeners on window and document
 * @returns {Function} Cleanup function
 */
export function initSmoothScrollController() {
  if (typeof window === 'undefined') return () => {}

  currentScroll = window.scrollY
  targetScroll = currentScroll

  /**
   * Sync positions on native scroll (scrollbar thumb drag, keyboard PageDown, touch swipe)
   */
  function handleNativeScroll() {
    if (!isAnimating) {
      currentScroll = window.scrollY
      targetScroll = window.scrollY
    }
  }

  /**
   * Handle mouse wheel input with zero layout thrashing and cross-browser delta normalization
   */
  function handleWheel(e) {
    if (isReducedMotionActive) return
    if (e.ctrlKey || e.metaKey || e.altKey) return

    // Fast O(1) DOM check — NO getComputedStyle or layout querying!
    if (e.target && e.target.closest && e.target.closest('[data-scroll-container], textarea, select')) {
      return
    }

    let delta = e.deltaY
    if (e.deltaMode === 1) {
      // DOM_DELTA_LINE (Firefox / Windows line mode)
      delta *= 24
    } else if (e.deltaMode === 2) {
      // DOM_DELTA_PAGE
      delta *= window.innerHeight
    } else {
      // Standard mouse wheel delta with natural travel multiplier
      delta *= WHEEL_MULTIPLIER
    }

    if (Math.abs(delta) < 0.1) return

    // Intercept default stepped jump to smoothly interpolate
    e.preventDefault()

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    )

    if (isProgrammaticScroll) {
      // User wheel immediately cancels anchor scrolling and takes manual control
      isProgrammaticScroll = false
      currentScroll = window.scrollY
      targetScroll = currentScroll + delta
    } else if (!isAnimating) {
      currentScroll = window.scrollY
      targetScroll = window.scrollY + delta
    } else {
      // Pivot immediately on direction reversal
      const isReversing =
        (delta > 0 && targetScroll < currentScroll) ||
        (delta < 0 && targetScroll > currentScroll)

      if (isReversing) {
        targetScroll = currentScroll + delta
      } else {
        targetScroll += delta
      }
    }

    // Clamp maximum lead distance to prevent runaway momentum on aggressive spinning
    const maxLead = window.innerHeight * 1.25
    targetScroll = Math.max(currentScroll - maxLead, Math.min(targetScroll, currentScroll + maxLead))
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll))

    startAnimation()
  }

  /**
   * Global anchor click listener — intercepts anchor clicks and animates with navbar clearance
   */
  function handleAnchorClick(e) {
    if (e.defaultPrevented) return
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return

    const anchor = e.target.closest('a[href^="#"]')
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href) return

    if (href !== '#' && href !== '#home') {
      const targetEl = document.querySelector(href)
      if (!targetEl) return
    }

    e.preventDefault()

    if (href === '#' || href === '#home') {
      smoothScrollTo(0, { offset: 0 })
      window.history.pushState(null, '', ' ')
    } else {
      smoothScrollTo(href, { offset: -90 })
      window.history.pushState(null, '', href)
    }
  }

  /**
   * Window resize handler
   */
  function handleResize() {
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    )
    currentScroll = Math.min(currentScroll, maxScroll)
    targetScroll = Math.min(targetScroll, maxScroll)
  }

  window.addEventListener('scroll', handleNativeScroll, { passive: true })
  window.addEventListener('wheel', handleWheel, { passive: false })
  document.addEventListener('click', handleAnchorClick)
  window.addEventListener('resize', handleResize, { passive: true })

  return () => {
    stopAnimation()
    window.removeEventListener('scroll', handleNativeScroll)
    window.removeEventListener('wheel', handleWheel)
    document.removeEventListener('click', handleAnchorClick)
    window.removeEventListener('resize', handleResize)
  }
}
