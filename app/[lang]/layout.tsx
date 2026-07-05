import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HtmlLang } from 'app/components/htmlLang'
import Footer from 'app/components/footer'
import { Navbar } from 'app/components/nav'
import { getDictionary } from '@/dictionaries'
import { LOCALES, isValidLocale, localeAlternates } from '@/i18n'
import { baseUrl } from 'app/sitemap'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLocale(lang)) return {}
  const dict = await getDictionary(lang)

  return {
    title: {
      default: dict.site.title,
      template: '%s',
    },
    description: dict.site.description,
    alternates: localeAlternates(baseUrl, lang, ''),
    openGraph: {
      title: 'Syang Personal Website',
      description: dict.site.description,
      url: `${baseUrl}/${lang}`,
      siteName: 'Syang Personal Website',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isValidLocale(lang)) {
    notFound()
  }
  const dict = await getDictionary(lang)

  return (
    <>
      <HtmlLang lang={lang} />
      <Navbar lang={lang} labels={dict.nav} />
      <main className="container">{children}</main>
      <Footer labels={dict.footer} />
    </>
  )
}
