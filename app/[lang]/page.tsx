import { getDictionary } from '@/dictionaries'
import { resolveLocale } from '@/i18n'
import { HomeClient } from './homeClient'

// Commented-out alternate tagline, preserved from before the i18n refactor:
// “您是一个有趣的人吗？” / “我觉得我是”

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
