import { headers } from 'next/headers'
import { NotFoundContent } from 'app/components/notFoundContent'
import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n'

export default async function NotFound() {
  const headerList = await headers()
  const headerLocale = headerList.get('x-locale') ?? ''
  const lang: Locale = isValidLocale(headerLocale) ? headerLocale : 'en'
  const dict = await getDictionary(lang)

  return <NotFoundContent title={dict.notFound.title} />
}
