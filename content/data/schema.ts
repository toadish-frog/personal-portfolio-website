import { z } from 'zod'

export const PhotoSchema = z.object({
  src: z.string().url(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
  country: z.string(),
  city: z.string(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}(-\d{2})?$/, 'date must be YYYY-MM or YYYY-MM-DD')
    .optional(),
  camera: z.string(),
  fstop: z.string(),
  lens: z.string(),
  focalLength: z.string().optional(),
  isFilm: z.boolean(),
  filmMake: z.string(),
  tags: z.array(z.string()),
})
export type Photo = z.infer<typeof PhotoSchema>
export const PhotoListSchema = z.array(PhotoSchema)

export const VideoSchema = z.object({
  src: z.string().url(),
  alt: z.string(),
  title: z.string(),
})
export type Video = z.infer<typeof VideoSchema>
export const VideoListSchema = z.array(VideoSchema)

export const BlogFrontmatterSchema = z.object({
  title: z.string(),
  publishedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt must be YYYY-MM-DD'),
  summary: z.string(),
  cover: z.string().optional(),
  tag: z.string().optional(),
})
export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>
