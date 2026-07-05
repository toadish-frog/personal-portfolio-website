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

// "简体" (jiǎntǐ, "Simplified [Chinese]") — names the script/locale variant,
// not "中文" (Zhōngwén, "the Chinese language" generically), since this site
// only offers the simplified-script locale.
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'EN',
  zh: '简体',
}

// Compact shorthand for the nav's small-screen locale switcher. "EN" is
// already compact enough to keep as-is; "简" (the first character of "简体"
// above) is the standard one-character shorthand for Simplified Chinese used
// by real bilingual sites' compact locale pickers.
export const LOCALE_NAMES_COMPACT: Record<Locale, string> = {
  en: 'EN',
  zh: '简',
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
