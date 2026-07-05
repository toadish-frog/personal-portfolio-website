'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from 'app/utils/formatDate'
import type { BlogFrontmatter } from '@/content/data/schema'
import type { Locale } from '@/i18n'

// Deliberately excludes `content` (the full MDX body) — nothing on this
// listing page renders it, so there's no reason to ship it down to the
// client as part of every post's props.
type PostSummary = { metadata: BlogFrontmatter; slug: string }

export function BlogPostsClient({
  posts,
  lang,
  readMoreLabel,
  allTagsLabel,
}: {
  posts: PostSummary[]
  lang: Locale
  readMoreLabel: string
  allTagsLabel: string
}) {
  const tags = useMemo(
    () =>
      Array.from(
        new Set(
          posts
            .map((post) => post.metadata.tag)
            .filter((tag): tag is string => !!tag),
        ),
      ),
    [posts],
  )
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredPosts = activeTag
    ? posts.filter((post) => post.metadata.tag === activeTag)
    : posts

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-8 flex w-full justify-center">
          <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-1 rounded-full bg-stone-50 p-0.5 dark:bg-stone-900">
            <button
              onClick={() => setActiveTag(null)}
              aria-pressed={activeTag === null}
              className={`text-md flex-1 rounded-full px-4 py-2 font-semibold transition duration-300 ease-in-out ${
                activeTag === null
                  ? 'bg-red-600 text-white'
                  : 'bg-transparent text-stone-800 hover:text-stone-600 dark:text-amber-50 dark:hover:text-white'
              }`}
            >
              {allTagsLabel}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                className={`text-md flex-1 rounded-full px-4 py-2 font-semibold transition duration-300 ease-in-out ${
                  activeTag === tag
                    ? 'bg-red-600 text-white'
                    : 'bg-transparent text-stone-800 hover:text-stone-600 dark:text-amber-50 dark:hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${lang}/blog/${post.slug}`}
            className="block"
          >
            <div className="card card-hover">
              <div className="relative h-48 w-full object-cover">
                {post.metadata.cover && (
                  <Image
                    src={post.metadata.cover}
                    alt={post.metadata.title}
                    fill={true}
                    sizes="50%"
                    priority={true}
                    style={{ aspectRatio: '9/16', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="w-full p-6">
                <p className="mb-2 w-full text-neutral-600 dark:text-neutral-400">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <h2 className="mb-2 w-full text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {post.metadata.title}
                </h2>
                <p className="mb-4 w-full truncate text-base text-gray-700 dark:text-gray-300">
                  {post.metadata.summary}
                </p>
                <p className="w-full text-blue-700 hover:underline dark:text-red-400">
                  {readMoreLabel}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
