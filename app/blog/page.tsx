import { BlogPosts } from 'app/blog/components/posts'
import { FadeText } from 'app/utils/fadehovertext'

export default function Page() {
  return (
    <section className="page-section">
      <h1 className="page-heading">
        Blog
      </h1>

      {/* <p
        className="text-3xl leading-relaxed mt-2 w-fit font-bold mb-10 text-stone-800 dark:text-amber-50">
        「记忆的质料」
      </p> */}

      <BlogPosts />
    </section>
  )
}
