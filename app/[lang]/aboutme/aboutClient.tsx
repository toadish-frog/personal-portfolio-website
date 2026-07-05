'use client'
import dynamic from 'next/dynamic'
import { Terminal } from './components/terminal'
import type { GlobeConfig } from '@/components/ui/globe'
import type { GlobeArc, Skill } from '@/content/data/schema'

const World = dynamic(
  () => import('@/components/ui/globe').then((mod) => mod.World),
  { ssr: false },
)
const SkillCloud = dynamic(
  () => import('./components/skillCloud').then((mod) => mod.SkillCloud),
  { ssr: false },
)

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: '#062056',
  showAtmosphere: true,
  atmosphereColor: '#FFFFFF',
  atmosphereAltitude: 0.1,
  emissive: '#062056',
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: 'rgba(255,255,255,0.7)',
  ambientLight: '#38bdf8',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 49.2827, lng: -123.1207 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
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
  return (
    <div className="flex flex-col items-center gap-16 pb-16">
      <Terminal lines={terminalLines} />

      <section className="flex w-full flex-col items-center gap-4">
        <h2 className="page-heading mt-0 mb-0 text-center">
          {countriesHeading}
        </h2>
        <div className="relative h-[28rem] w-full max-w-2xl">
          <World data={globeArcs} globeConfig={globeConfig} />
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
