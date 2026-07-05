import { BlogPosts } from 'app/[lang]/blog/components/posts'
import { getDictionary } from '@/dictionaries'
import { resolveLocale } from '@/i18n'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const safeLang = resolveLocale(lang)
  const dict = await getDictionary(safeLang)

  return (
    <section className="page-section">
      <h1 className="page-heading">{dict.pages.blog.heading}</h1>

      <BlogPosts
        lang={safeLang}
        readMoreLabel={dict.pages.blog.readMore}
        allTagsLabel={dict.pages.blog.allTags}
      />
    </section>
  )
}
