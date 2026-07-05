import { Icon_ArrowIcon, Icon_LinkedinIcon, Icon_GithubIcon } from 'public/icon'
import type { Dictionary } from '@/dictionaries'

export default function Footer({ labels }: { labels: Dictionary['footer'] }) {
  return (
    <footer className="page-section mb-16">
      <ul className="font-sm mt-8 flex flex-col space-y-2 space-x-0 text-neutral-600 md:flex-row md:space-y-0 md:space-x-4 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/sean-yang-6746621b7/"
          >
            <Icon_ArrowIcon />
            <Icon_LinkedinIcon />
            <p className="ml-2 h-7">{labels.linkedin}</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/xya89/myPersonalWebsite"
          >
            <Icon_ArrowIcon />
            <Icon_GithubIcon />
            <p className="ml-2 h-7">{labels.github}</p>
          </a>
        </li>
        {/* <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href=""
          >
            <ArrowIcon />
            <p className="ml-2 h-7">view source</p>
          </a>
        </li> */}
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} {labels.license}
      </p>
    </footer>
  )
}
