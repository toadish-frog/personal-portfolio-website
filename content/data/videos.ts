import { VideoListSchema, type Video } from './schema'

const rawVideos: Video[] = [
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1739688444/porfolio/Video/IMG_5998_lafjvg.mov',
    alt: 'JellyFish - Sunshine City Aquarium Tokyo',
    title: 'Jelly Fish',
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1739687300/porfolio/Video/IMG_6410_tngglb.mov',
    alt: 'Hokkaido Winter Snow - Lake Kussharo',
    title: 'Hokkaido Winter - Lake Kussharo',
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1739688624/porfolio/Video/2019_japan_1080p_irlygr.mp4',
    alt: '2019 Japan',
    title: '2019 Summer - Japan',
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613746/porfolio/Video/WeChat_20240605115417_iingoc.mp4',
    alt: 'Under Santa Monica Pier',
    title: 'Under Santa Monica Pier',
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613723/porfolio/Video/WeChat_20240605115436_wvk3hf.mp4',
    alt: 'Santa Barbara Sunset',
    title: 'Santa Barbara Sunset',
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613774/porfolio/Video/WeChat_20240605115325_sp6uve.mp4',
    alt: 'View of mountain and gulf',
    title: "View from friend's balcony.",
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613771/porfolio/Video/WeChat_20240605115352_v5a9y2.mp4',
    alt: 'Boil water with MSR windburner',
    title: 'Boil water with MSR WindBurner®',
  },
  {
    src: 'https://res.cloudinary.com/dasffmfcg/video/upload/v1717613716/porfolio/Video/WeChat_20240605115458_s3jddg.mp4',
    alt: 'Car start up',
    title: 'Console Screen DIY',
  },
]

export const videos: Video[] = VideoListSchema.parse(rawVideos)
