import { baseUrl } from 'app/sitemap'

// AI crawlers blocked in Cloudflare AI Crawl Control for media.yxyang.space
// (Copyright Protection, Decision 7, row 3). www is not proxied by
// Cloudflare, so this file repeats the block here. Tokens from the
// ai.robots.txt project; matching is case-insensitive (RFC 9309).
const BLOCKED_AI_CRAWLERS = [
  'Bytespider',
  'CCBot',
  'DuckAssistBot',
  'FacebookBot',
  'Manus-User',
  'meta-externalagent',
  'meta-externalfetcher',
  'MistralAI-User',
  'Perplexity-User',
  'PerplexityBot',
  'TerraCotta',
  'TikTokSpider',
  'Timpibot',
]

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
      {
        userAgent: BLOCKED_AI_CRAWLERS,
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
