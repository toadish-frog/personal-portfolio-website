'use client'
import dynamic from 'next/dynamic'

// Shuffles with Math.random() on mount — SSR would shuffle differently on
// server vs. client, a hydration mismatch on every image. Client-only avoids
// it entirely rather than a deterministic seed or reshuffle flash.
const ImageGallery = dynamic(() => import('./components/imageGallery'), {
  ssr: false,
})

export function PhotosClient({
  loadMoreLabel,
  noResultsLabel,
}: {
  loadMoreLabel: string
  noResultsLabel: string
}) {
  return (
    <ImageGallery
      loadMoreLabel={loadMoreLabel}
      noResultsLabel={noResultsLabel}
    />
  )
}
