import { VideoListSchema, type Video } from './schema'

// `tags` added in Phase 6 (source data had none) — best-effort, derived only
// from each video's title/alt text. Not verified against actual content;
// site owner should review.
const rawVideos: Video[] = [
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1739688444/porfolio/Video/IMG_5998_lafjvg.mov',
    alt: 'JellyFish - Sunshine City Aquarium Tokyo',
    title: 'Jelly Fish',
    tags: ['Random'],
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1739687300/porfolio/Video/IMG_6410_tngglb.mov',
    alt: 'Hokkaido Winter Snow - Lake Kussharo',
    title: 'Hokkaido Winter - Lake Kussharo',
    tags: ['Roadtrip', 'Random'],
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1739688624/porfolio/Video/2019_japan_1080p_irlygr.mp4',
    alt: '2019 Japan',
    title: '2019 Summer - Japan',
    tags: ['Roadtrip', 'Random'],
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613746/porfolio/Video/WeChat_20240605115417_iingoc.mp4',
    alt: 'Under Santa Monica Pier',
    title: 'Under Santa Monica Pier',
    tags: ['Roadtrip', 'Outdoors'],
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613723/porfolio/Video/WeChat_20240605115436_wvk3hf.mp4',
    alt: 'Santa Barbara Sunset',
    title: 'Santa Barbara Sunset',
    tags: ['Roadtrip'],
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613774/porfolio/Video/WeChat_20240605115325_sp6uve.mp4',
    alt: 'View of mountain and gulf',
    title: "View from friend's balcony.",
    tags: ['Random'],
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613771/porfolio/Video/WeChat_20240605115352_v5a9y2.mp4',
    alt: 'Boil water with MSR windburner',
    title: 'Boil water with MSR WindBurner®',
    tags: ['Outdoors'],
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613716/porfolio/Video/WeChat_20240605115458_s3jddg.mp4',
    alt: 'Car start up',
    title: 'Console Screen DIY',
    tags: ['Random'],
  },
]

export const videos: Video[] = VideoListSchema.parse(rawVideos)
