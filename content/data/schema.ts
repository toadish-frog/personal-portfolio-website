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
  // CMS-only fields; today's photos.ts entries have none of them.
  id: z.string().optional(),
  thumbhash: z.string().optional(), // base64
})
export type Photo = z.infer<typeof PhotoSchema>
export const PhotoListSchema = z.array(PhotoSchema)

export const VideoSchema = z.object({
  src: z.string().url(),
  alt: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  // CMS-only fields; today's videos.ts entries have none of them.
  id: z.string().optional(),
  poster: z.string().url().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})
export type Video = z.infer<typeof VideoSchema>
export const VideoListSchema = z.array(VideoSchema)

export const CountrySchema = z.object({
  name: z.string(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
})
export type Country = z.infer<typeof CountrySchema>
export const CountryListSchema = z.array(CountrySchema)

// Matches Aceternity UI's "Github Globe" arc data shape, so real trip data
// can later be mapped into this exact shape without changing the component.
export const GlobeArcSchema = z.object({
  order: z.number(),
  startLat: z.number().min(-90).max(90),
  startLng: z.number().min(-180).max(180),
  endLat: z.number().min(-90).max(90),
  endLng: z.number().min(-180).max(180),
  arcAlt: z.number().min(0).max(1),
  color: z.string(),
})
export type GlobeArc = z.infer<typeof GlobeArcSchema>
export const GlobeArcListSchema = z.array(GlobeArcSchema)

export const SkillSchema = z.object({
  name: z.string(),
  slug: z.string(), // simple-icons export key, e.g. "siTypescript"
})
export type Skill = z.infer<typeof SkillSchema>
export const SkillListSchema = z.array(SkillSchema)

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
