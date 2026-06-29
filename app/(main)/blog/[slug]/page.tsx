import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/utils/mdx'
import { formatDate, getBlogPosts } from 'app/(main)/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    cover: image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="page-section">
      <div className='container lg mx-auto w-full'>
        <div className='bg-white dark:bg-neutral-800 rounded-lg shadow-md break-words'>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.cover
                  ? `${baseUrl}${post.metadata.cover}`
                  : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                url: `${baseUrl}/blog/${post.slug}`,
                author: {
                  '@type': 'Person',
                  name: 'My Portfolio',
                },
              }),
            }}
          />
          {post.metadata.cover && (<img
            src={post.metadata.cover}
            alt={post.metadata.title}
            className='w-full h-64 object-cover' />
          )}
          <div className="p-6">
            <h1 className="title font-semibold text-2xl tracking-tighter">
              {post.metadata.title}
            </h1>
            <div className="flex justify-between items-center mt-2 mb-8 text-sm">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </div>
            <div className='flex justify-between items-center mt-2 mb-8 text-xl tracking-tighter break-normal'>
              {post.metadata.summary}
            </div>
            <article className="prose break-normal">
              <CustomMDX source={post.content} />
            </article>
          </div>

        </div>

      </div>

    </section >
  )
}
