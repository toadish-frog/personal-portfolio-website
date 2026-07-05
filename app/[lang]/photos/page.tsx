import { PhotosClient } from './photosClient'
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
      <h1 className="page-heading">{dict.pages.photos.heading}</h1>

      {/* <FadeText
                diyStyle={'text-3xl leading-relaxed mt-2 w-fit font-bold mb-10 text-stone-800 dark:text-amber-50 hover:text-red-600 duration-350 '}
                defaultText={'「行于流逝的岸」'}
                hoverText={'所有的过往终将归于虚无，如同泪水消失在雨中'}
                duration={300}
                enableClicked={true}
            /> */}

      <div className="flex justify-between">
        {/* <div
                    className="items-left text-large leading-relaxed mb-5 text-left">
                    My Watermarks:
                    <ul className="text-sm text-gray-700 dark:text-gray-400">
                        <li>Edwardyoung photography</li>
                        <li>Young photography</li>
                    </ul>
                </div> */}
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
