import { getDictionary } from '@/dictionaries'
import { resolveLocale } from '@/i18n'
import { HomeClient } from './homeClient'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const safeLang = resolveLocale(lang)
  const dict = await getDictionary(safeLang)

  return <HomeClient tagline={dict.home.tagline} />
}
