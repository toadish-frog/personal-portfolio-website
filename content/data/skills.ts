import { SkillListSchema, type Skill } from './schema'

// Starter list, derived from this repo's stack + blog mentions, not invented.
// Site owner should edit to match their real skill set; slugs must match a
// `simple-icons` export (e.g. `siTypescript`).
const rawSkills: Skill[] = [
  { name: 'TypeScript', slug: 'siTypescript' },
  { name: 'React', slug: 'siReact' },
  { name: 'Next.js', slug: 'siNextdotjs' },
  { name: 'Tailwind CSS', slug: 'siTailwindcss' },
  { name: 'Python', slug: 'siPython' },
  { name: 'R', slug: 'siR' },
  { name: 'PostgreSQL', slug: 'siPostgresql' },
  { name: 'Pandas', slug: 'siPandas' },
  { name: 'Jupyter', slug: 'siJupyter' },
  { name: 'Streamlit', slug: 'siStreamlit' },
  { name: 'Git', slug: 'siGit' },
  { name: 'GitHub', slug: 'siGithub' },
  { name: 'Linux', slug: 'siLinux' },
  { name: 'Vercel', slug: 'siVercel' },
]

export const skills: Skill[] = SkillListSchema.parse(rawSkills)
