import { VideoGallery } from './components/videoGallery'
import { getDictionary } from '@/dictionaries'
import { resolveLocale } from '@/i18n'
import { getVideos } from 'lib/media'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const safeLang = resolveLocale(lang)
  const dict = await getDictionary(safeLang)
  const videos = await getVideos()

  return (
    <section className="page-section">
      <h1 className="page-heading">{dict.pages.video.heading}</h1>

      <VideoGallery
        videos={videos}
        noResultsLabel={dict.pages.video.noResults}
      />
    </section>
  )
}
