import { timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

export function requireBlogAdmin(event: H3Event): void {
  const expected = useRuntimeConfig(event).blogAdminToken

  if (!expected) {
    throw createError({ statusCode: 503, statusMessage: 'Blog admin access is not configured.' })
  }

  const authorization = getHeader(event, 'authorization') ?? ''
  const supplied = authorization.match(/^Bearer\s+(.+)$/i)?.[1] ?? ''
  const suppliedBytes = Buffer.from(supplied)
  const expectedBytes = Buffer.from(expected)

  if (suppliedBytes.length !== expectedBytes.length || !timingSafeEqual(suppliedBytes, expectedBytes)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid admin token.' })
  }
}