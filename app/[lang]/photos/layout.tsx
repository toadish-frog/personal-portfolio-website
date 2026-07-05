import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const safeLang: Locale = isValidLocale(lang) ? lang : 'en'
  const dict = await getDictionary(safeLang)
  return {
    title: dict.pages.photos.title,
    description: dict.pages.photos.description,
  }
}

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
