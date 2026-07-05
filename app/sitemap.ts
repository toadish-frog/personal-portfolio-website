import { getBlogPosts } from 'lib/blog'
import { LOCALES } from '@/i18n'

export const baseUrl = 'https://yxyang.lol'

// TODO(Phase 8): emit one entry per locale (LOCALES x routes) instead of
// defaulting everything to the default locale — full multi-locale sitemap
// coverage is explicitly scoped to the SEO/a11y phase, not this i18n plumbing pass.
export default async function sitemap() {
  const [defaultLocale] = LOCALES

  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/${defaultLocale}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog', '/aboutme', '/photos', '/video'].map((route) => ({
    url: `${baseUrl}/${defaultLocale}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
