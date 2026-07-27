'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Terminal } from 'app/components/ui/terminal'
import type { GlobeConfig } from 'app/components/ui/globe'
import type { GlobeArc, Skill } from '@/content/data/schema'

const World = dynamic(
  () => import('app/components/ui/globe').then((mod) => mod.World),
  { ssr: false },
)
const SkillCloud = dynamic(
  () => import('app/components/ui/skillCloud').then((mod) => mod.SkillCloud),
  { ssr: false },
)

const SHARED_GLOBE_CONFIG = {
  showAtmosphere: true,
  pointSize: 5,
  atmosphereAltitude: 0.1,
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 49.2827, lng: -123.1207 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
}

const DARK_GLOBE_CONFIG: GlobeConfig = {
  ...SHARED_GLOBE_CONFIG,

  globeColor: '#0b0909',
  atmosphereColor: '#fff5f5',

  emissive: '#170303',
  emissiveIntensity: 0.15,
  shininess: 0.5,

  polygonColor: 'rgba(255,255,255,1)',

  ambientLight: '#f5f5f5',
  ambientLightIntensity: 0.6,
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ff6666',
}

const LIGHT_GLOBE_CONFIG: GlobeConfig = {
  ...SHARED_GLOBE_CONFIG,

  globeColor: '#f7f7f7',
  atmosphereColor: '#ffffff',

  emissive: '#f6f6f6',
  emissiveIntensity: 0.12,
  shininess: 0.5,

  polygonColor: 'rgba(0,0,0,1)',

  ambientLight: '#ffffff',
  ambientLightIntensity: 10,
  directionalLeftLight: '#f4f4f4',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
}

export function AboutClient({
  terminalLines,
  countriesHeading,
  skillsHeading,
  professionalLinkLabel,
  globeArcs,
  skills,
}: {
  terminalLines: { command: string; output: string[] }[]
  countriesHeading: string
  skillsHeading: string
  professionalLinkLabel: string
  globeArcs: GlobeArc[]
  skills: Skill[]
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const globeConfig =
    mounted && resolvedTheme === 'light'
      ? LIGHT_GLOBE_CONFIG
      : DARK_GLOBE_CONFIG

  return (
    <div className="flex flex-col items-center gap-16 pb-16">
      <Terminal lines={terminalLines} />

      <section className="flex w-full flex-col items-center gap-4">
        <h2 className="page-heading mt-0 mb-0 text-center">
          {countriesHeading}
        </h2>
        <div className="relative h-115 w-full md:h-200">
          <World data={globeArcs} globeConfig={globeConfig} />
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-40 h-full bg-linear-to-b from-transparent to-white dark:to-black" />
        </div>
      </section>

      <section className="flex w-full flex-col items-center gap-4">
        <h2 className="page-heading mt-0 mb-0 text-center">{skillsHeading}</h2>
        <SkillCloud skills={skills} />
      </section>

      <a
        href="https://www.yxyang.info"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-black/10 px-5 py-2 text-sm font-medium transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
      >
        {professionalLinkLabel} →
      </a>
    </div>
  )
}
