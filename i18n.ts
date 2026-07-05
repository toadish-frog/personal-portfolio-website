import type { Metadata } from 'next'

export const DEFAULT_LOCALE = 'en' as const
export const ALT_LOCALE = 'zh' as const
export const LOCALES = [DEFAULT_LOCALE, ALT_LOCALE] as const

export type Locale = (typeof LOCALES)[number]

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

// Every page.tsx/layout.tsx under app/[lang]/ falls back to the default
// locale the same way — this centralizes that instead of repeating
// `isValidLocale(lang) ? lang : 'en'` (with 'en' as a magic string) at every
// call site.
export function resolveLocale(lang: string): Locale {
  return isValidLocale(lang) ? lang : DEFAULT_LOCALE
}

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'EN',
  zh: '中文',
}

// Shared by every fixed-route layout's generateMetadata (home, photos,
// video, aboutme, blog listing) so each locale's page correctly points to
// its sibling translations via <link rel="alternate" hreflang="...">,
// rather than only being discoverable through the sitemap.
export function localeAlternates(
  baseUrl: string,
  currentLocale: Locale,
  route: string,
) {
  return {
    canonical: `${baseUrl}/${currentLocale}${route}`,
    languages: Object.fromEntries(
      LOCALES.map((locale) => [locale, `${baseUrl}/${locale}${route}`]),
    ),
  }
}

// Shared by the fixed-route section layouts (photos, video, aboutme, blog) —
// each generateMetadata still resolves its own locale and dictionary (the
// dict key accessed differs per section), but the resulting title/description
// object and its hreflang alternates are built the same way everywhere.
export function sectionMetadata(
  baseUrl: string,
  lang: Locale,
  route: string,
  page: { title: string; description: string },
): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: localeAlternates(baseUrl, lang, route),
  }
}
