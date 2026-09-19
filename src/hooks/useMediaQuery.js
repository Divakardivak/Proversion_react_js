import { useState, useEffect } from 'react'

/**
 * Hook to match CSS media queries reactively.
 * @param {string} query - e.g. '(min-width: 768px)' or '(max-width: 1024px)'
 * @returns {boolean} true if media query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)

    // Initial check
    setMatches(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

export default useMediaQuery
