import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALES, isValidLocale } from '@/i18n'

function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    for (const part of acceptLanguage.split(',')) {
      const lang = part.split(';')[0]!.trim().slice(0, 2).toLowerCase()
      if (isValidLocale(lang)) return lang
    }
  }
  return DEFAULT_LOCALE
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const matchedLocale = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (matchedLocale) return NextResponse.next()

  const locale = getPreferredLocale(request)
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  matcher: [
    '/((?!_next|api|og|rss|robots.txt|sitemap.xml|favicon.ico|.*\\..*).*)',
  ],
}
