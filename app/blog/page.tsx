import { BlogPosts } from 'app/blog/components/posts'
import { FadeText } from 'app/utils/fadehovertext'

export default function Page() {
  return (
    <section className="antialiased max-w-6xl mx-2 mt-8 lg:mx-auto flex-auto min-w-0 mt-6 flex flex-col px-2 lg:px-4">
      <h1 className="font-semibold text-2xl mb-8 mt-20 tracking-tighter 
      bg-gradient-to-b text-transparent bg-clip-text 
      from-zinc-900 via-zinc-800 to-stone-500
      dark:from-zinc-300 dark:via-zinc-200 dark:to-stone-500
      ">
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
