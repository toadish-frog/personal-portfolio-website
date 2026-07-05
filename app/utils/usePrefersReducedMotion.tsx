import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // window.matchMedia doesn't exist during SSR, so the real value can only
    // be read after mount — this is a synchronization-with-an-external-API
    // effect, not a derivable-from-props/state case a lazy initializer could
    // replace.
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}
