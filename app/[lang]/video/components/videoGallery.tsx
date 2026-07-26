'use client'
import { useMemo, useRef, useState } from 'react'
import { useIsVisible } from 'app/utils/isVisible'
import { TagFilterBar } from 'app/components/tagFilterBar'
import { videos } from '@/content/data/videos'

const TAG_FILTERS = ['Random', 'Roadtrip', 'Outdoors']

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
      <TagFilterBar
        tags={TAG_FILTERS}
        isActive={(tag) => activeTags.includes(tag)}
        onToggle={toggleTag}
      />

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
