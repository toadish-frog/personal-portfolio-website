import { createHmac, timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import { MEDIA_TAGS } from 'lib/media'

// Called by the CMS after every create, edit and delete (Website Integration
// Contract): body `{"tag","ts"}`, header `X-Signature: sha256=<hex HMAC-SHA256
// of the raw body>`. Any failed check is a bare 401, so callers learn nothing
// about which one failed.
const MAX_BODY_BYTES = 1024
const MAX_SKEW_SECONDS = 300
const SIGNATURE = /^sha256=([0-9a-f]{64})$/

const BodySchema = z.object({
  tag: z.enum(MEDIA_TAGS),
  ts: z.number().int(),
})

const unauthorized = () =>
  Response.json({ error: 'unauthorized' }, { status: 401 })

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return Response.json({ error: 'not configured' }, { status: 503 })
  }

  const match = SIGNATURE.exec(request.headers.get('x-signature') ?? '')
  if (!match) return unauthorized()

  const raw = await request.text()
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return unauthorized()

  // Signature first: the body is not parsed until it is known to be the CMS's.
  const expected = createHmac('sha256', secret).update(raw).digest()
  const given = Buffer.from(match[1], 'hex')
  if (!timingSafeEqual(expected, given)) return unauthorized()

  let json: unknown
  try {
    json = JSON.parse(raw)
  } catch {
    return unauthorized()
  }
  const body = BodySchema.safeParse(json)
  if (!body.success) return unauthorized()

  const now = Math.floor(Date.now() / 1000)
  if (Math.abs(now - body.data.ts) > MAX_SKEW_SECONDS) return unauthorized()

  revalidateTag(body.data.tag, 'max')
  return Response.json({ revalidated: body.data.tag })
}
