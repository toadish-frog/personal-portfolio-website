import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getBlogPosts } from 'app/(main)/blog/utils'

//TODO: add tagging features

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="space-y-6">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
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
                <p className="w-full text-blue-500 hover:underline dark:text-red-500">
                  Read more
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
