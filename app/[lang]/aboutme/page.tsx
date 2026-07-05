import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n'
import { globeArcs } from '@/content/data/globeArcs'
import { skills } from '@/content/data/skills'
import { AboutClient } from './aboutClient'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const safeLang: Locale = isValidLocale(lang) ? lang : 'en'
  const dict = await getDictionary(safeLang)

  return (
    <section className="page-section">
      <h1 className="page-heading">{dict.pages.about.heading}</h1>
      <AboutClient
        terminalLines={dict.pages.about.terminal}
        countriesHeading={dict.pages.about.countriesHeading}
        skillsHeading={dict.pages.about.skillsHeading}
        professionalLinkLabel={dict.pages.about.professionalLinkLabel}
        globeArcs={globeArcs}
        skills={skills}
      />
    </section>
  )
}
