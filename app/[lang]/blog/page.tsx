import { BlogPosts } from 'app/[lang]/blog/components/posts'
import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n'

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
      <h1 className="page-heading">{dict.pages.blog.heading}</h1>

      <BlogPosts lang={safeLang} readMoreLabel={dict.pages.blog.readMore} />
    </section>
  )
}
