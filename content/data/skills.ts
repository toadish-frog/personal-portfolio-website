import { SkillListSchema, type Skill } from './schema'

// Starter list only — populated from evidence actually found while working on
// this repo (this site's own stack, plus tools mentioned in the existing blog
// posts and the now-deleted resume data), not invented from scratch. The site
// owner should edit this to match their real current skill set; slugs must
// match an export from the `simple-icons` package (e.g. `siTypescript`).
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
