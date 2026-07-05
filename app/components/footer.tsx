import { ArrowUpRight } from 'lucide-react'
import { Icon_LinkedinIcon, Icon_GithubIcon } from 'public/icon'
import type { Dictionary } from '@/dictionaries'

export default function Footer({ labels }: { labels: Dictionary['footer'] }) {
  const links = [
    {
      href: 'https://www.linkedin.com/in/sean-yang-6746621b7/',
      label: labels.linkedin,
      icon: Icon_LinkedinIcon,
    },
    {
      href: 'https://github.com/xya89/myPersonalWebsite',
      label: labels.github,
      icon: Icon_GithubIcon,
    },
  ]

  return (
    <footer className="page-section mt-8 mb-16 border-t border-black/10 pt-8 dark:border-white/10">
      <div className="flex flex-wrap gap-2">
        {links.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-stone-800 transition-colors hover:bg-black/5 dark:border-white/10 dark:text-amber-50 dark:hover:bg-white/10"
          >
            <Icon className="h-4 w-4" />
            {label}
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        ))}
      </div>
      <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} {labels.license}
      </p>
    </footer>
  )
}
