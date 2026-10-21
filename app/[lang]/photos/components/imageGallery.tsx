'use client'
import { useEffect, useMemo, useState, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useIsVisible } from 'app/utils/isVisible'
import { TagFilterBar } from 'app/components/tagFilterBar'
import { GlowingEffect } from 'app/components/ui/glowingEffect'
import { FadeInImage } from './fadeInImage'
import type { Photo } from '@/content/data/schema'

const TAG_FILTERS = ['Digital', 'Film', 'B&W', 'Color']
const PAGE_SIZE = 24
// Grid is 1 column below md, 2 columns above, capped by .page-section's
// max-w-6xl (1152px). Without `sizes`, `fill` images default to 100vw and
// desktop downloads roughly twice the pixels it shows.
const GRID_SIZES = '(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw'
const POPUP_SIZES = '(min-width: 1024px) 70vw, 92vw'

export default function ImageGallery({
  photos,
  loadMoreLabel,
  noResultsLabel,
}: {
  photos: Photo[]
  loadMoreLabel: string
  noResultsLabel: string
}) {
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null)
  const reduceMotion = useReducedMotion()
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
        ? photos
        : photos.filter((img) =>
            activeTags.every((tag) => img.tags.includes(tag)),
          ),
    [photos, activeTags],
  )

  const visibleImages = filteredImages.slice(0, visibleCount)
  const hasMore = visibleCount < filteredImages.length

  return (
    <section
      ref={refAll}
      className={`fade-section ${isVisibleThis ? 'opacity-100' : 'opacity-0'}`}
    >
      <TagFilterBar
        tags={TAG_FILTERS}
        isActive={(tag) => activeTags.includes(tag)}
        onToggle={toggleTag}
      />

      {filteredImages.length === 0 ? (
        <p className="text-center text-stone-600 dark:text-stone-400">
          {noResultsLabel}
        </p>
      ) : (
        <>
          {/* Main */}
          <div
            className={`grid grid-flow-row grid-cols-1 justify-normal gap-4 transition-[filter] duration-300 md:grid-cols-2 lg:grid-cols-2 ${selectedImage ? 'blur-md brightness-50 grayscale' : ''} `}
          >
            {visibleImages.map((img, index) => (
              <div
                key={`${img.src}-${index}`}
                className="relative h-96 w-full rounded-xl bg-stone-200 dark:bg-stone-800"
              >
                <div className="pointer-events-none absolute inset-0.5 z-10 hidden rounded-[inherit] lg:block">
                  <GlowingEffect
                    spread={40}
                    glow
                    borderWidth={2}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                </div>
                <div style={{ paddingTop: '75%' /* 4:3 aspect ratio */ }}>
                  <FadeInImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={GRID_SIZES}
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

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="overlay"
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <motion.div
              className={`image-popup relative h-3/4 w-11/12 rounded-lg bg-white/90 p-2 md:h-[60%] lg:m-20 lg:mt-10 lg:h-[85%] lg:w-[70%] dark:bg-black/50`}
              initial={{ scale: reduceMotion ? 1 : 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: reduceMotion ? 1 : 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
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
                  <FadeInImage
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes={POPUP_SIZES}
                    className="object-contain"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>

              {/* photo-metadata  */}
              <div className="mt-20 flex w-full justify-center px-4">
                <div className="lg:text-md flex w-full justify-between bg-linear-to-b from-zinc-800 via-zinc-600 to-stone-600 bg-clip-text text-sm text-transparent lg:w-[90%] dark:from-zinc-400 dark:via-zinc-100 dark:to-stone-300">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
