'use client'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useIsVisible } from 'app/utils/isVisible'
import { usePrefersReducedMotion } from 'app/utils/usePrefersReducedMotion'
import { CurrentDateTime } from 'app/utils/currentDateTime'
import { EncryptedText } from 'app/components/ui/encryptedText'

// Dynamically imported: heavy, purely decorative, and each already gates
// itself behind prefers-reduced-motion — no reason to ship this JS on the
// critical path or run it during SSR.
const Vortex = dynamic(
  () => import('app/components/ui/vortex').then((mod) => mod.Vortex),
  { ssr: false },
)
const Aurora = dynamic(
  () => import('app/components/ui/aurora').then((mod) => mod.Aurora),
  { ssr: false },
)

export function HomeClient({ tagline }: { tagline: string[] }) {
  const ref1 = useRef(null)
  const isVisible = useIsVisible(ref1)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { resolvedTheme } = useTheme()
  // next-themes' pre-hydration script can make resolvedTheme already defined
  // on the client's first render while the server always renders it
  // undefined — a real mismatch. Gating on mounted keeps both renders
  // identical at hydration time, same as nav.tsx's theme icon.
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  return (
    <div
      ref={ref1}
      className={`fade-section relative flex h-screen w-full flex-col items-center justify-center overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {mounted && !prefersReducedMotion && resolvedTheme === 'dark' && (
        <Vortex
          containerClassName="animate-fade-in fixed inset-0 -z-10"
          backgroundColor="transparent"
          baseHue={355}
          rangeHue={30}
          rangeY={700}
        />
      )}

      {mounted && !prefersReducedMotion && resolvedTheme === 'light' && (
        <Aurora className="animate-fade-in fixed inset-0 -z-10" />
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
              <EncryptedText text={line} />
              {index < tagline.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
