import { NotFoundClient } from './notFoundClient'
import { getDictionary } from '@/dictionaries'
import { LOCALES, type Locale } from '@/i18n'

// Reads no request data (no headers()/cookies()): any dynamic API here makes
// every route under [lang] render on demand instead of prerendering. Both
// titles are passed down and the client picks one from the URL.
export default async function NotFound() {
  const entries = await Promise.all(
    LOCALES.map(
      async (locale) =>
        [locale, (await getDictionary(locale)).notFound.title] as const,
    ),
  )
  const titles = Object.fromEntries(entries) as Record<Locale, string>

  return <NotFoundClient titles={titles} />
}
