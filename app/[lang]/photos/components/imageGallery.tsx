'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { FadeText } from 'app/utils/fadehovertext'
import { useIsVisible } from 'app/utils/isVisible'

// 因为懒得买cloudiary等的付费api服务(确实贵，不如买点薯条，所以假装自己有一个api返回值
// 目前是通过jsDelivr进行资源分布的，正在摸索jsDelivr的相关api（如果有）
import imageSource from 'app/data/imageSource.json'

interface ImageItem {
  src: string
  alt: string
  width: number | string
  height: number | string
  country: string
  city: string
  date: string
  camera: string
  fstop: string
  lens: string
  'focal.Length'?: string
  isFilm: boolean
  filmMake: string
  tags: string[]
}

// Shuffle Image Array
const shuffleArray = (array: ImageItem[]) => {
  return array.sort(() => Math.random() - 0.5)
}

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [shuffledImage] = useState<ImageItem[]>(() =>
    shuffleArray([...(imageSource as ImageItem[])]),
  )
  const [activeTags, setActiveTags] = useState<string[]>(['B&W'])

  const refAll = useRef<HTMLElement>(null)
  const isVisibleThis = useIsVisible(refAll)

  const handleImageClick = (img: ImageItem) => {
    setSelectedImage(img)
  }

  const closeOverlay = () => {
    setSelectedImage(null)
  }

  // click anywhere else the popup will also close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (selectedImage && !target.closest('.image-popup')) {
        closeOverlay()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [selectedImage])

  const toggleTag = (tag: string) => {
    setActiveTags((preTags) =>
      preTags.includes(tag)
        ? preTags.filter((t) => t !== tag)
        : [...preTags, tag],
    )
  }

  const filteredImages =
    activeTags.length === 0
      ? shuffledImage
      : shuffledImage.filter(
          (img) =>
            img.tags && activeTags.every((tag) => img.tags.includes(tag)),
        )

  return (
    <section
      ref={refAll}
      className={`fade-section ${isVisibleThis ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* tags */}
      <div className="mb-4 flex w-full justify-center">
        <div className="flex w-full max-w-md items-center justify-center rounded-full bg-stone-50 p-0.5 dark:bg-stone-900">
          <div className="flex w-full flex-wrap gap-1">
            {['Digital', 'Film', 'B&W', 'Color'].map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-md flex-1 rounded-full px-4 py-2 font-semibold transition duration-300 ease-in-out ${
                  activeTags.includes(tag)
                    ? 'bg-red-600 text-white'
                    : 'bg-transparent text-stone-800 hover:text-stone-600 dark:text-amber-50 dark:hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        className={`grid grid-flow-row grid-cols-1 justify-normal gap-4 md:grid-cols-2 lg:grid-cols-2 ${selectedImage ? 'blur-md brightness-50 grayscale' : ''} `}
      >
        {filteredImages.map((img, index) => (
          <div key={index} className={`relative h-96 w-full object-cover`}>
            <div style={{ paddingTop: '75%' /* 4:3 aspect ratio */ }}>
              <Image
                src={img.src}
                alt={img.alt}
                layout="fill"
                objectFit="cover"
                onClick={() => handleImageClick(img)}
                loading="lazy"
                className="rounded-xl shadow-md"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className={`fixed inset-0 flex items-center justify-center`}>
          <div
            className={`image-popup relative h-3/4 w-11/12 rounded-lg bg-white/90 p-2 md:h-[60%] lg:m-20 lg:mt-10 lg:h-[85%] lg:w-[70%] dark:bg-black/50`}
          >
            {/* exit-button-top-right */}
            <button
              className="absolute top-2 right-2 text-black dark:text-white"
              onClick={closeOverlay}
            >
              &times;
            </button>
            <div className="relative mt-6 flex h-[70%] w-full lg:h-[85%]">
              <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  layout="fill"
                  objectFit="contain"
                  loading="lazy"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* photo-metadata  */}
            <div className="mt-20 flex w-full justify-center px-4">
              <div className="lg:text-md flex w-full justify-between bg-gradient-to-b from-zinc-800 via-zinc-600 to-stone-600 bg-clip-text text-sm text-transparent lg:w-[90%] dark:from-zinc-400 dark:via-zinc-100 dark:to-stone-300">
                <div className="flex flex-col text-left">
                  {selectedImage.camera}
                  <br />
                  {selectedImage.lens}
                  <br />
                  {selectedImage.isFilm ? selectedImage.filmMake : ''}
                </div>
                <div className="flex flex-col text-right">
                  {selectedImage.city}
                  <br />
                  {selectedImage.country}
                  <br />
                  {selectedImage.date}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
