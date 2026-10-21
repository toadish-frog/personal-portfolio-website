'use client'
import { usePathname } from 'next/navigation'
import { NotFoundContent } from 'app/components/notFoundContent'
import { resolveLocale, type Locale } from '@/i18n'

// not-found.tsx can't receive route params, so the locale comes from the
// first path segment instead.
export function NotFoundClient({ titles }: { titles: Record<Locale, string> }) {
  const lang = resolveLocale(usePathname().split('/')[1] ?? '')
  return <NotFoundContent title={titles[lang]} />
}
