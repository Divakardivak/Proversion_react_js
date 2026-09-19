/**
 * Custom High-Refresh-Rate Smooth Scroll Controller Engine
 * Pure vanilla JavaScript module — zero React state, zero dependencies.
 *
 * Provides:
 * - Native document scrolling via window.scrollTo({ behavior: 'instant' })
 * - Time-based exponential interpolation independent of display refresh rate
 * - Single on-demand requestAnimationFrame loop (stops completely when idle)
 * - Wheel input delta normalization (DOM_DELTA_PIXEL, DOM_DELTA_LINE, DOM_DELTA_PAGE)
 * - Instant user wheel interrupt of programmatic anchor animations
 * - Direction reversal pivot to eliminate sluggish inertia fighting
 * - Native touch scrolling & native keyboard scrolling preservation
 */

let currentScroll = typeof window !== 'undefined' ? window.scrollY : 0
let targetScroll = currentScroll
let isAnimating = false
let isProgrammaticScroll = false
let rafId = null
let lastTime = 0
let isReducedMotionActive = false

// Exponential smoothing response constant (12 = buttery, immediate, crisp)
const RESPONSE = 12

/**
 * Time-based exponential interpolation step
 * Mathematically identical across 60Hz, 120Hz, 144Hz, 165Hz, and 240Hz
 */
function animate(currentTime) {
  if (!isAnimating) return

  // Calculate elapsed time in seconds, clamped to 100ms max (e.g. tab switch)
  const dt = Math.min((currentTime - lastTime) / 1000, 0.1)
  lastTime = currentTime

  // Frame-rate independent exponential interpolation
  const alpha = 1 - Math.exp(-RESPONSE * dt)
  currentScroll += (targetScroll - currentScroll) * alpha

  // Check sub-pixel threshold
  const diff = Math.abs(targetScroll - currentScroll)
  if (diff < 0.3) {
    currentScroll = targetScroll
    window.scrollTo({
      top: currentScroll,
      left: 0,
      behavior: 'instant',
    })
    isAnimating = false
    isProgrammaticScroll = false
    rafId = null
    return // Stop loop: zero CPU/GPU load while stationary
  }

  window.scrollTo({
    top: currentScroll,
    left: 0,
    behavior: 'instant',
  })

  rafId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (!isAnimating) {
    isAnimating = true
    lastTime = performance.now()
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
}

/**
 * Check if element or parent has native scroll room (modals, dropdowns, code blocks)
 */
function hasScrollableAncestor(el, deltaY) {
  if (!el || el === document.body || el === document.documentElement) return false
  const style = window.getComputedStyle(el)
  const overflowY = style.overflowY
  const isScrollable = overflowY === 'auto' || overflowY === 'scroll'

  if (isScrollable && el.scrollHeight > el.clientHeight) {
    const atTop = el.scrollTop <= 0 && deltaY < 0
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight && deltaY > 0
    if (!atTop && !atBottom) return true
  }

  return hasScrollableAncestor(el.parentElement, deltaY)
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
    window.scrollTo({
      top: destination,
      left: 0,
      behavior: 'instant',
    })
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
   * Handle mouse wheel input with cross-browser delta normalization
   */
  function handleWheel(e) {
    if (isReducedMotionActive) return
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (hasScrollableAncestor(e.target, e.deltaY)) return

    let delta = e.deltaY
    if (e.deltaMode === 1) {
      delta *= 20
    } else if (e.deltaMode === 2) {
      delta *= window.innerHeight
    }

    if (Math.abs(delta) < 0.1) return

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
