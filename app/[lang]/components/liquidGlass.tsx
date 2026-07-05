'use client'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from 'app/utils/usePrefersReducedMotion'
import { cn } from 'lib/utils'

const blobs = [
  {
    color: 'bg-red-500/30 dark:bg-red-500/20',
    size: 'h-72 w-72',
    start: { left: '10%', top: '15%' },
    range: { x: [0, 40, -30, 0], y: [0, -30, 40, 0] },
    duration: 20,
  },
  {
    color: 'bg-orange-400/20 dark:bg-orange-400/15',
    size: 'h-96 w-96',
    start: { left: '65%', top: '55%' },
    range: { x: [0, -50, 20, 0], y: [0, 30, -20, 0] },
    duration: 26,
  },
  {
    color: 'bg-rose-400/20 dark:bg-rose-400/15',
    size: 'h-80 w-80',
    start: { left: '35%', top: '70%' },
    range: { x: [0, 30, -40, 0], y: [0, -20, 30, 0] },
    duration: 23,
  },
]

export function LiquidGlass({ className }: { className?: string }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={cn(
            'absolute rounded-full blur-3xl',
            blob.color,
            blob.size,
          )}
          style={blob.start}
          animate={
            prefersReducedMotion
              ? undefined
              : { x: blob.range.x, y: blob.range.y }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
