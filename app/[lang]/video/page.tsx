import { VideoGallery } from './components/videoGallery'
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
      <h1 className="page-heading">{dict.pages.video.heading}</h1>

      {/* <p
                className="text-3xl leading-relaxed mt-2 w-fit font-bold mb-10 text-stone-800 dark:text-amber-50">
                「梦应归于何处」
            </p> */}

      <VideoGallery />
    </section>
  )
}
