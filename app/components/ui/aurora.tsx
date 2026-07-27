'use client'

// Adapted from Aceternity UI's Aurora Background. Original wraps page
// content in its own layout container; here it's just the gradient layer,
// dropped in like vortex.tsx (app/[lang]/homeClient.tsx owns the layout).
// Requires --animate-aurora registered in app/global.css's @theme block.
//
// dark:invert-0 / --dark-gradient dropped (only mounts in light theme, see
// homeClient.tsx). Keep the bare `invert` in BASE_LAYER_PAINT though — the
// mix-blend-difference layer produces `255-color` wherever a white stripe
// overlaps a color stripe, and invert cancels exactly that back out.

import { cn } from '@/lib/utils'

interface AuroraProps {
  className?: string
  showRadialGradient?: boolean
}

// Gradient color stops (10/15/20/25/30%) — edit these to retheme. Names
// (--blue-500 etc.) are baked into GRADIENT_VARIABLES's class string below
// and can't be renamed without editing that too.
const AURORA_STOP_1 = '#3b82f6' // --blue-500,   10%
const AURORA_STOP_2 = '#a5b4fc' // --indigo-300, 15%
const AURORA_STOP_3 = '#93c5fd' // --blue-300,   20%
const AURORA_STOP_4 = '#ddd6fe' // --violet-200, 25%
const AURORA_STOP_5 = '#60a5fa' // --blue-400,   30%

const WHITE = '#fff'
const TRANSPARENT = 'transparent'

const AURORA_GRADIENT = `repeating-linear-gradient(100deg,${AURORA_STOP_1}_10%,${AURORA_STOP_2}_15%,${AURORA_STOP_3}_20%,${AURORA_STOP_4}_25%,${AURORA_STOP_5}_30%)`
const WHITE_STRIPE_GRADIENT = `repeating-linear-gradient(100deg,${WHITE}_0%,${WHITE}_7%,${TRANSPARENT}_10%,${TRANSPARENT}_12%,${WHITE}_16%)`

// Class string split by concern (safe for Tailwind's scanner — it reads raw
// source text, not the joined runtime result).
const LAYOUT = 'pointer-events-none absolute -inset-2.5 will-change-transform'

const BASE_LAYER_PAINT =
  '[background-image:var(--white-gradient),var(--aurora)] bg-size-[300%,200%] bg-position-[50%_50%,50%_50%] opacity-50 blur-[10px] invert'

// Redeclares --aurora/--white-gradient from the named vars so :after can
// animate its own background-position independently.
const GRADIENT_VARIABLES =
  '[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]'

const ANIMATED_LAYER =
  'after:animate-aurora after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:bg-size-[200%,100%] after:bg-fixed after:mix-blend-difference after:content-[""]'

const RADIAL_MASK =
  'mask-[radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]'

export function Aurora({ className, showRadialGradient = true }: AuroraProps) {
  return (
    <div
      className={cn('overflow-hidden', className)}
      style={
        {
          '--aurora': AURORA_GRADIENT,
          '--white-gradient': WHITE_STRIPE_GRADIENT,
          '--blue-500': AURORA_STOP_1,
          '--indigo-300': AURORA_STOP_2,
          '--blue-300': AURORA_STOP_3,
          '--violet-200': AURORA_STOP_4,
          '--blue-400': AURORA_STOP_5,
          '--white': WHITE,
          '--transparent': TRANSPARENT,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          LAYOUT,
          BASE_LAYER_PAINT,
          GRADIENT_VARIABLES,
          ANIMATED_LAYER,
          showRadialGradient && RADIAL_MASK,
        )}
      />
    </div>
  )
}
