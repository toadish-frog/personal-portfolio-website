import { getBlogPosts } from 'lib/blog'
import { LOCALES } from '@/i18n'
import type { MetadataRoute } from 'next'

export const baseUrl = 'https://yxyang.space'

const STATIC_ROUTES = ['', '/blog', '/aboutme', '/photos', '/video']

// One entry per (route x locale) — every page has both an English and a
// Chinese URL, and each entry cross-links to its sibling via
// alternates.languages so crawlers know they're translations of each other
// rather than duplicate content.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split('T')[0]

  const pages = [
    ...STATIC_ROUTES.map((route) => ({ route, lastModified: today })),
    ...getBlogPosts().map((post) => ({
      route: `/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    })),
  ]

  return pages.flatMap(({ route, lastModified }) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((altLocale) => [
            altLocale,
            `${baseUrl}/${altLocale}${route}`,
          ]),
        ),
      },
    })),
  )
}
