// Static CSP (not nonce-based): this codebase relies on inline `style={{}}`
// attributes throughout (photo/video aspect-ratio boxes, the globe canvas)
// and Next.js's App Router injects its own inline hydration bootstrap
// scripts — both need 'unsafe-inline'. A nonce-based CSP is the stronger
// alternative but requires threading a per-request nonce through proxy.ts
// and every inline script/style, which is a bigger change than this personal
// site's threat model justifies right now. This still blocks loading
// scripts/styles/frames from arbitrary third-party origins, which is the
// main practical benefit of a CSP for a site with no user-generated content.
//
// 'unsafe-eval' is also required: the About page's skill cloud
// (react-icon-cloud, components/aboutme/components/skillCloud.tsx) wraps the
// TagCanvas library, which literally calls eval("TagCanvas.Start(...)")
// internally to initialize — without 'unsafe-eval' the browser silently
// blocks every eval() call and the cloud never renders (no visible error
// pointing at the real cause, just an empty canvas). Confirmed by reading
// node_modules/react-icon-cloud/dist/react-icon-cloud.esm.js directly.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://res.cloudinary.com",
  "font-src 'self' data:",
  "media-src 'self' https://res.cloudinary.com",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
