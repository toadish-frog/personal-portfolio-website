import { PhotosClient } from './photosClient'
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
      <h1 className="page-heading">{dict.pages.photos.heading}</h1>

      <div className="flex justify-between">
        <div className="items-right text-large mb-5 text-left leading-relaxed">
          {dict.pages.photos.camera}
          <ul className="text-sm text-gray-700 dark:text-gray-400">
            <li>Sony ILCE-7M3</li>
            <li>Nikon F-601</li>
            <li>FUJI DL-1000</li>
          </ul>
        </div>
        <div className="items-left text-large mb-5 text-right leading-relaxed">
          {dict.pages.photos.lens}
          <ul className="text-sm text-gray-700 dark:text-gray-400">
            <li>Sony 16-35mm F4 ZA</li>
            <li>Sony 70-200mm F4 OSS</li>
            <li>Sony 35mm F2.8 ZA</li>
          </ul>
        </div>
      </div>

      <PhotosClient
        loadMoreLabel={dict.pages.photos.loadMore}
        noResultsLabel={dict.pages.photos.noResults}
      />
    </section>
  )
}
