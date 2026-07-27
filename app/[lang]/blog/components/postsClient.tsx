'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from 'app/utils/formatDate'
import { TagFilterBar } from 'app/components/tagFilterBar'
import { GlowingEffect } from 'app/components/ui/glowingEffect'
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
        <TagFilterBar
          tags={tags}
          isActive={(tag) => activeTag === tag}
          onToggle={(tag) => setActiveTag(tag)}
          leadingButton={{
            label: allTagsLabel,
            active: activeTag === null,
            onClick: () => setActiveTag(null),
          }}
        />
      )}

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${lang}/blog/${post.slug}`}
            className="block"
          >
            <div className="card card-hover relative">
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
              <div className="relative z-0 h-48 w-full object-cover">
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
