'use client'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from 'app/utils/usePrefersReducedMotion'
import { cn } from 'lib/utils'

export function CursorTrace({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return

    // Listens on window, not `el` — `el` has pointer-events-none (by design,
    // so it doesn't block clicks on the content above it), which means it
    // never receives pointer events targeted at itself.
    let frame: number
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--x', `${event.clientX - rect.left}px`)
        el.style.setProperty('--y', `${event.clientY - rect.top}px`)
        el.style.setProperty('--opacity', '1')
      })
    }
    const handleLeave = () => el.style.setProperty('--opacity', '0')

    // pointerleave (unlike pointerout) doesn't bubble, so attaching it to
    // documentElement only fires on a true page-leave, not on every
    // transition between elements inside the page.
    window.addEventListener('pointermove', handleMove)
    document.documentElement.addEventListener('pointerleave', handleLeave)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.documentElement.removeEventListener('pointerleave', handleLeave)
      cancelAnimationFrame(frame)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 transition-opacity duration-300',
        className,
      )}
      style={{
        opacity: 'var(--opacity, 0)',
        background:
          'radial-gradient(650px circle at var(--x, 50%) var(--y, 50%), rgba(255, 40, 40, 0.28), transparent 45%)',
      }}
    />
  )
}
