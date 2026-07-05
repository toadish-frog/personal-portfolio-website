import { getBlogPosts } from 'lib/blog'
import type { Locale } from '@/i18n'
import { BlogPostsClient } from './postsClient'

export function BlogPosts({
  lang,
  readMoreLabel,
  allTagsLabel,
}: {
  lang: Locale
  readMoreLabel: string
  allTagsLabel: string
}) {
  let allBlogs = getBlogPosts()
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    // Client component only renders metadata — no reason to ship the full
    // MDX body of all 15+ posts down as part of the listing page's props.
    .map(({ metadata, slug }) => ({ metadata, slug }))

  return (
    <BlogPostsClient
      posts={allBlogs}
      lang={lang}
      readMoreLabel={readMoreLabel}
      allTagsLabel={allTagsLabel}
    />
  )
}
