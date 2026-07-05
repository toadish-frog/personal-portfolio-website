'use client'
import Image from 'next/image'
import { useEffect, useMemo, useState, useRef } from 'react'
import { useIsVisible } from 'app/utils/isVisible'
import { photos } from '@/content/data/photos'
import type { Photo } from '@/content/data/schema'

const TAG_FILTERS = ['Digital', 'Film', 'B&W', 'Color']
const PAGE_SIZE = 24

// Shuffle Image Array
const shuffleArray = (array: Photo[]) => {
  return array.sort(() => Math.random() - 0.5)
}

export default function ImageGallery({
  loadMoreLabel,
  noResultsLabel,
}: {
  loadMoreLabel: string
  noResultsLabel: string
}) {
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null)
  const [shuffledPhotos] = useState<Photo[]>(() => shuffleArray([...photos]))
  const [activeTags, setActiveTags] = useState<string[]>(['B&W'])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const refAll = useRef<HTMLElement>(null)
  const isVisibleThis = useIsVisible(refAll)

  const handleImageClick = (img: Photo) => {
    setSelectedImage(img)
  }

  const closeOverlay = () => {
    setSelectedImage(null)
  }

  // click anywhere else the popup will also close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (selectedImage && !target.closest('.image-popup')) {
        closeOverlay()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [selectedImage])

  const toggleTag = (tag: string) => {
    setActiveTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    )
    // A new filter selection is a new result set — start back at page one.
    setVisibleCount(PAGE_SIZE)
  }

  const filteredImages = useMemo(
    () =>
      activeTags.length === 0
        ? shuffledPhotos
        : shuffledPhotos.filter((img) =>
            activeTags.every((tag) => img.tags.includes(tag)),
          ),
    [shuffledPhotos, activeTags],
  )

  const visibleImages = filteredImages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredImages.length

  return (
    <section
      ref={refAll}
      className={`fade-section ${isVisibleThis ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* tags */}
      <div className="mb-4 flex w-full justify-center">
        <div className="flex w-full max-w-md items-center justify-center rounded-full bg-stone-50 p-0.5 dark:bg-stone-900">
          <div className="flex w-full flex-wrap gap-1">
            {TAG_FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={activeTags.includes(tag)}
                className={`text-md flex-1 rounded-full px-4 py-2 font-semibold transition duration-300 ease-in-out ${
                  activeTags.includes(tag)
                    ? 'bg-red-600 text-white'
                    : 'bg-transparent text-stone-800 hover:text-stone-600 dark:text-amber-50 dark:hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <p className="text-center text-stone-600 dark:text-stone-400">
          {noResultsLabel}
        </p>
      ) : (
        <>
          {/* Main */}
          <div
            className={`grid grid-flow-row grid-cols-1 justify-normal gap-4 md:grid-cols-2 lg:grid-cols-2 ${selectedImage ? 'blur-md brightness-50 grayscale' : ''} `}
          >
            {visibleImages.map((img, index) => (
              <div key={`${img.src}-${index}`} className="relative h-96 w-full">
                <div style={{ paddingTop: '75%' /* 4:3 aspect ratio */ }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    onClick={() => handleImageClick(img)}
                    loading="lazy"
                    className="rounded-xl object-cover shadow-md"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="rounded-full border border-stone-300 px-6 py-2 font-semibold text-stone-800 transition hover:bg-stone-100 dark:border-stone-700 dark:text-amber-50 dark:hover:bg-stone-900"
              >
                {loadMoreLabel}
              </button>
            </div>
          )}
        </>
      )}

      {selectedImage && (
        <div className={`fixed inset-0 flex items-center justify-center`}>
          <div
            className={`image-popup relative h-3/4 w-11/12 rounded-lg bg-white/90 p-2 md:h-[60%] lg:m-20 lg:mt-10 lg:h-[85%] lg:w-[70%] dark:bg-black/50`}
          >
            {/* exit-button-top-right */}
            <button
              className="absolute top-2 right-2 text-black dark:text-white"
              onClick={closeOverlay}
            >
              &times;
            </button>
            <div className="relative mt-6 flex h-[70%] w-full lg:h-[85%]">
              <div className="relative h-full w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  loading="lazy"
                  className="object-contain"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* photo-metadata  */}
            <div className="mt-20 flex w-full justify-center px-4">
              <div className="lg:text-md flex w-full justify-between bg-gradient-to-b from-zinc-800 via-zinc-600 to-stone-600 bg-clip-text text-sm text-transparent lg:w-[90%] dark:from-zinc-400 dark:via-zinc-100 dark:to-stone-300">
                <div className="flex flex-col text-left">
                  {selectedImage.camera}
                  <br />
                  {selectedImage.lens}
                  {selectedImage.isFilm && selectedImage.filmMake && (
                    <>
                      <br />
                      {selectedImage.filmMake}
                    </>
                  )}
                </div>
                <div className="flex flex-col text-right">
                  {selectedImage.city}
                  <br />
                  {selectedImage.country}
                  {selectedImage.date && (
                    <>
                      <br />
                      {selectedImage.date}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
