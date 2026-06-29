'use client'
import { FadeText } from "app/utils/fadehovertext"
import { VideoGallery } from "./components/videoGallery"

export default function Page() {
    return (
        <section className="page-section">
            <h1 className="page-heading">
                Video
            </h1>

            {/* <p
                className="text-3xl leading-relaxed mt-2 w-fit font-bold mb-10 text-stone-800 dark:text-amber-50">
                「梦应归于何处」
            </p> */}

            <VideoGallery />

        </section>
    )
}
