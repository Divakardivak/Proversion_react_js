import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './SmoothScroll.css'

/**
 * SmoothScroll — Cross-browser 144Hz Lenis wrapper.
 *
 * Problem: When autoRaf:true, Lenis creates its own internal rAF loop that
 * Chrome's strict scheduler can desync from the actual paint tick, causing
 * visible lag at 144Hz. Edge is more lenient and hides this issue.
 *
 * Fix: autoRaf:false + a manual requestAnimationFrame loop driven by
 * performance.now() — this ties Lenis EXACTLY to the browser's paint cycle
 * on Chrome, Edge, Firefox, and Safari identically.
 */
export function SmoothScroll({ children }) {
  const shouldReduceMotion = useReducedMotion()
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  useEffect(() => {
    // Manual RAF loop — the key to cross-browser 144Hz parity.
    // By calling lenis.raf(time) inside requestAnimationFrame, we guarantee
    // Lenis updates on the same microtask as the browser's compositor, not
    // one frame behind (which is what autoRaf:true causes in Chrome).
    function rafLoop(time) {
      lenisRef.current?.lenis?.raf(time)
      rafIdRef.current = requestAnimationFrame(rafLoop)
    }

    rafIdRef.current = requestAnimationFrame(rafLoop)

    return () => {
      // Critical: cancel on unmount to prevent memory leaks & ghost loops
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  // Pause/resume when tab becomes hidden/visible (saves CPU/GPU)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const lenis = lenisRef.current?.lenis
      if (!lenis) return
      if (document.visibilityState === 'hidden') {
        lenis.stop()
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      } else {
        lenis.start()
        // Restart the RAF loop when tab becomes visible again
        function rafLoop(time) {
          lenisRef.current?.lenis?.raf(time)
          rafIdRef.current = requestAnimationFrame(rafLoop)
        }
        rafIdRef.current = requestAnimationFrame(rafLoop)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        // ── Core interpolation ──────────────────────────────────────────────
        // lerp: fraction of remaining distance to close per frame.
        // 0.08 gives a natural deceleration curve at all refresh rates.
        // Lower = smoother but laggier feel; higher = snappier.
        lerp: 0.08,

        // ── Input multipliers ───────────────────────────────────────────────
        // Slightly boost wheel sensitivity so 144Hz feels responsive, not slow.
        wheelMultiplier: 1.2,
        touchMultiplier: 1.8,

        // ── Orientation ─────────────────────────────────────────────────────
        orientation: 'vertical',
        gestureOrientation: 'vertical',

        // ── Wheel smoothing ─────────────────────────────────────────────────
        smoothWheel: true,

        // ── Touch & mobile ──────────────────────────────────────────────────
        // syncTouch:true makes mobile feel native-smooth (no separate lerp on touch)
        syncTouch: true,

        // ── Anchor support ──────────────────────────────────────────────────
        anchors: true,

        // ── CRITICAL: disable Lenis internal RAF loop ───────────────────────
        // We drive updates ourselves via the manual loop in useEffect above.
        // This is what fixes Chrome 144Hz lag — the auto loop runs one tick
        // behind the compositor in Chrome's scheduler.
        autoRaf: false,

        // ── Prevent infinite scroll ─────────────────────────────────────────
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll
