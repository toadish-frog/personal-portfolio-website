export const DEFAULT_LOCALE = 'en' as const
export const ALT_LOCALE = 'zh' as const
export const LOCALES = [DEFAULT_LOCALE, ALT_LOCALE] as const

export type Locale = (typeof LOCALES)[number]

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'EN',
  zh: '中文',
}
