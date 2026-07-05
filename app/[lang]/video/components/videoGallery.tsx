'use client'
import { useMemo, useRef, useState } from 'react'
import { useIsVisible } from 'app/utils/isVisible'
import { videos } from '@/content/data/videos'

const TAG_FILTERS = ['Japan', 'U.S.', 'Winter', 'Outdoors', 'DIY']

export function VideoGallery({ noResultsLabel }: { noResultsLabel: string }) {
  const [activeTags, setActiveTags] = useState<string[]>([])
  const refAll = useRef(null)
  const isVisibleThis = useIsVisible(refAll)

  const toggleTag = (tag: string) => {
    setActiveTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    )
  }

  const filteredVideos = useMemo(
    () =>
      activeTags.length === 0
        ? videos
        : videos.filter((vid) =>
            activeTags.every((tag) => vid.tags.includes(tag)),
          ),
    [activeTags],
  )

  return (
    <section
      ref={refAll}
      className={`transition-opacity duration-700 ease-in ${isVisibleThis ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* tags */}
      <div className="mb-8 flex w-full justify-center">
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

      {filteredVideos.length === 0 ? (
        <p className="text-center text-stone-600 dark:text-stone-400">
          {noResultsLabel}
        </p>
      ) : (
        filteredVideos.map((vid, index) => (
          <div key={`${vid.src}-${index}`}>
            <p className="mb-2 text-3xl text-stone-800 dark:text-amber-50">
              {vid.title}
            </p>

            <div
              className="relative mb-20"
              style={{
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                maxWidth: '100%',
              }}
            >
              <video
                src={vid.src}
                controls
                // No autoplay-on-mount cost: the browser won't fetch any
                // video bytes until the user actually presses play.
                preload="none"
                // Required on iOS Safari — without it, tapping play forces
                // fullscreen instead of playing inline.
                playsInline
                aria-label={vid.alt}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              ></video>
            </div>
          </div>
        ))
      )}
    </section>
  )
}
