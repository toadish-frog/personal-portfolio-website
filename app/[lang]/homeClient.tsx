'use client'
import React from 'react'
import { useIsVisible } from 'app/utils/isVisible'
import Particles from 'app/components/particles'
import { CurrentDateTime } from 'app/utils/currentDateTime'
import { useRef } from 'react'

export function HomeClient({ tagline }: { tagline: string[] }) {
  const ref1 = useRef(null)
  const isVisible = useIsVisible(ref1)

  return (
    <div
      ref={ref1}
      className={`fade-section flex h-screen w-screen flex-col items-center justify-center overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="hidden h-px w-screen md:block" />

      <Particles
        className="animate-fade-in absolute inset-0 -z-10"
        quantity={300}
        color={{ r: 255, g: 10, b: 10 }}
      />

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
