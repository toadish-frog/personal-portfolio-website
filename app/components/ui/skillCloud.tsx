'use client'
import {
  Cloud,
  renderSimpleIcon,
  type SimpleIcon,
  type IOptions,
} from 'react-icon-cloud'
import * as simpleIcons from 'simple-icons'
import type { Skill } from '@/content/data/schema'

const cloudOptions: Partial<IOptions> = {
  clickToFront: 500,
  depth: 1,
  imageScale: 2,
  initial: [0.1, -0.1],
  outlineColour: '#0000',
  reverse: true,
  tooltip: 'native',
  wheelZoom: false,
}

export function SkillCloud({ skills }: { skills: Skill[] }) {
  const icons = skills
    .map((skill) => {
      const icon = (simpleIcons as Record<string, SimpleIcon | undefined>)[
        skill.slug
      ]
      if (!icon) return null
      return renderSimpleIcon({
        icon,
        size: 42,
        bgHex: '#00000000',
        fallbackHex: '#888888',
        minContrastRatio: 1.2,
        aProps: {
          onClick: (event: React.MouseEvent) => event.preventDefault(),
          title: skill.name,
        },
      })
    })
    .filter((icon): icon is NonNullable<typeof icon> => icon !== null)

  return (
    <div className="h-96 w-full max-w-md overflow-hidden">
      <Cloud
        options={cloudOptions}
        containerProps={{ className: 'h-full w-full' }}
      >
        {icons}
      </Cloud>
    </div>
  )
}
