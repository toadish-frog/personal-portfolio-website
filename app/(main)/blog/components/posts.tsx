import Link from 'next/link'
import Image from 'next/image';
import { formatDate, getBlogPosts } from 'app/(main)/blog/utils'

//TODO: add tagging features

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="space-y-6">
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <div className="card card-hover">
              <div className='w-full h-48 object-cover relative'>
                {post.metadata.cover && (
                  <Image
                    src={post.metadata.cover}
                    alt={post.metadata.title}
                    fill={true}
                    sizes='50%'
                    priority={true}
                    style={{ aspectRatio: '9/16', objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="p-6 w-full">
                <p className="text-neutral-600 dark:text-neutral-400 mb-2 w-full">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <h2 className="font-semibold text-xl text-neutral-900 dark:text-neutral-100 mb-2 w-full">
                  {post.metadata.title}
                </h2>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4 w-full truncate">
                  {post.metadata.summary}
                </p>
                <p className="text-blue-500 dark:text-red-500 hover:underline w-full">Read more</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
