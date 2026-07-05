'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { useIsVisible } from 'app/utils/isVisible'
import { usePrefersReducedMotion } from 'app/utils/usePrefersReducedMotion'
import { CurrentDateTime } from 'app/utils/currentDateTime'
import { useRef } from 'react'

// Dynamically imported: heavy, purely decorative, and each already gates
// itself behind prefers-reduced-motion — no reason to ship this JS on the
// critical path or run it during SSR.
const Particles = dynamic(() => import('app/components/particles'), {
  ssr: false,
})
const LiquidGlass = dynamic(
  () => import('./components/liquidGlass').then((mod) => mod.LiquidGlass),
  { ssr: false },
)
const CursorTrace = dynamic(
  () => import('./components/cursorTrace').then((mod) => mod.CursorTrace),
  { ssr: false },
)

export function HomeClient({ tagline }: { tagline: string[] }) {
  const ref1 = useRef(null)
  const isVisible = useIsVisible(ref1)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      ref={ref1}
      className={`fade-section relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="hidden h-px w-screen md:block" />

      <LiquidGlass className="-z-20" />
      <CursorTrace className="z-0" />

      {!prefersReducedMotion && (
        <Particles
          className="animate-fade-in absolute inset-0 -z-10"
          quantity={300}
          color={{ r: 255, g: 10, b: 10 }}
        />
      )}

      <CurrentDateTime
        diyStyle="font-sans lg:text-7xl font-bold text-4xl text-red-600"
        year={true}
        hours={true}
        minutes={true}
        seconds={true}
      />

      <div className="mt-10 text-center lg:mt-28">
        <div className="mb-6 text-center font-serif text-2xl leading-tight font-bold text-stone-800 sm:mb-8 sm:text-4xl md:mb-10 md:text-5xl lg:mb-12 lg:text-6xl xl:mb-16 xl:text-7xl dark:text-stone-300">
          {tagline.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < tagline.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
