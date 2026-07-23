import { notFound } from 'next/navigation'
import Image from 'next/image'
import { CustomMDX } from 'app/utils/mdx'
import { formatDate } from 'app/utils/formatDate'
import { getBlogPosts } from 'lib/blog'
import { baseUrl } from 'app/sitemap'
import { resolveLocale } from '@/i18n'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const safeLang = resolveLocale(lang)
  let post = getBlogPosts().find((post) => post.slug === slug)
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
      url: `${baseUrl}/${safeLang}/blog/${post.slug}`,
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

export default async function Blog({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const safeLang = resolveLocale(lang)
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="page-section">
      <div className="lg container mx-auto w-full">
        <div className="wrap-break-words rounded-lg bg-white shadow-md dark:bg-neutral-800">
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
                url: `${baseUrl}/${safeLang}/blog/${post.slug}`,
                author: {
                  '@type': 'Person',
                  name: 'My Portfolio',
                },
              }),
            }}
          />
          {post.metadata.cover && (
            <div className="relative h-64 w-full">
              <Image
                src={post.metadata.cover}
                alt={post.metadata.title}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h1 className="title text-2xl font-semibold tracking-tighter">
              {post.metadata.title}
            </h1>
            <div className="mt-2 mb-8 flex items-center justify-between text-sm">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </div>
            <div className="mt-2 mb-8 flex items-center justify-between text-xl tracking-tighter break-normal">
              {post.metadata.summary}
            </div>
            <article className="prose break-normal">
              <CustomMDX source={post.content} />
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
