import { baseUrl } from 'app/sitemap'

// Crawlers blocked in Cloudflare AI Crawl Control for media.yxyang.space
// (Copyright Protection, Decision 7, row 3), repeated here because www is
// not proxied by Cloudflare. BingBot stays allowed so the site appears in
// Bing search. Tokens from the ai.robots.txt and crawler-user-agents
// projects; matching is case-insensitive (RFC 9309).
const BLOCKED_CRAWLERS = [
  // search engines and web archives
  'Baiduspider',
  'PetalBot',
  'archive.org_bot',
  'Arquivo-web-crawler',
  // AI crawlers of the same Baidu and Huawei services (not in the
  // Cloudflare list)
  'ERNIEBot',
  'YiyanBot',
  'PanguBot',
  // AI crawlers
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
        userAgent: BLOCKED_CRAWLERS,
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
