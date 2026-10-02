import { timingSafeEqual } from 'node:crypto'
import { runDailyBlogGeneration } from '../../utils/daily-blog-scheduler'

export default defineEventHandler(async (event) => {
  const secret = process.env.CRON_SECRET ?? ''
  const authorization = getHeader(event, 'authorization') ?? ''
  const expected = Buffer.from(`Bearer ${secret}`)
  const supplied = Buffer.from(authorization)

  if (
    !secret
    || supplied.length !== expected.length
    || !timingSafeEqual(supplied, expected)
  ) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized cron request.' })
  }

  const config = useRuntimeConfig(event)
  if (!config.openRouterApiKey) {
    throw createError({ statusCode: 503, statusMessage: 'OpenRouter is not configured.' })
  }

  await runDailyBlogGeneration({
    openRouterApiKey: config.openRouterApiKey,
    blogsStorageFile: config.blogsStorageFile,
  })

  return { ok: true }
})