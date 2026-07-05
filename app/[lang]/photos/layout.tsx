import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import { resolveLocale, sectionMetadata } from '@/i18n'
import { baseUrl } from 'app/sitemap'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const safeLang = resolveLocale(lang)
  const dict = await getDictionary(safeLang)
  return sectionMetadata(baseUrl, safeLang, '/photos', dict.pages.photos)
}

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
