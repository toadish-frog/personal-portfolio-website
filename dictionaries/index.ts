import type { Locale } from '@/i18n'

export interface Dictionary {
  site: {
    title: string
    description: string
  }
  nav: {
    home: string
    about: string
    blog: string
    photo: string
    video: string
  }
  footer: {
    linkedin: string
    github: string
    license: string
  }
  home: {
    tagline: string[]
  }
  pages: {
    about: {
      title: string
      description: string
      countriesHeading: string
      skillsHeading: string
      professionalLinkLabel: string
      terminal: { command: string; output: string[] }[]
    }
    photos: {
      title: string
      heading: string
      description: string
      camera: string
      lens: string
    }
    video: { title: string; heading: string; description: string }
    blog: {
      title: string
      heading: string
      description: string
      readMore: string
    }
  }
  notFound: { title: string }
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./en.json').then((mod) => mod.default),
  zh: () => import('./zh.json').then((mod) => mod.default),
}

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
