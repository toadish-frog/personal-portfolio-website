import {
  PhotoListSchema,
  VideoListSchema,
  type Photo,
  type Video,
} from '@/content/data/schema'

// Revalidate tags the CMS sends to /api/revalidate (Website Integration
// Contract). The route's allowlist is this list.
export const MEDIA_TAGS = ['photos', 'videos'] as const
export type MediaTag = (typeof MEDIA_TAGS)[number]

// Every failure throws on purpose: a throw during a background revalidation
// makes Next keep serving the last good page instead of caching bad data.
async function fetchList(tag: MediaTag): Promise<unknown> {
  const base = process.env.CMS_API_URL
  if (!base) throw new Error('CMS_API_URL is not set')
  const res = await fetch(`${base.replace(/\/$/, '')}/${tag}`, {
    cache: 'force-cache',
    next: { tags: [tag] },
  })
  if (!res.ok) throw new Error(`CMS ${tag}: HTTP ${res.status}`)
  return res.json()
}

export async function getPhotos(): Promise<Photo[]> {
  return PhotoListSchema.parse(await fetchList('photos'))
}

export async function getVideos(): Promise<Video[]> {
  return VideoListSchema.parse(await fetchList('videos'))
}
