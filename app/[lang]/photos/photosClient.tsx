'use client'
import dynamic from 'next/dynamic'

// The gallery shuffles photos with Math.random() on mount — server-rendering
// it would shuffle once on the server and again on the client, producing two
// different orders and a hydration mismatch on every image. Client-only
// avoids that entirely rather than working around it with a deterministic
// seed or a post-mount reshuffle flash.
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
