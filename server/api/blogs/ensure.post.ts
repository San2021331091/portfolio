import { generateSkillBlogDraft } from '../../utils/generate-skill-blog'
import { getBlogList, getPublishedBlogs, publishBlog } from '../../utils/blog-store'

const minimumGeneratedPosts = 2
let firstPostGeneration: Promise<Awaited<ReturnType<typeof getPublishedBlogs>>> | undefined
let retryAfter = 0

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const currentPosts = await getPublishedBlogs(config.blogsStorageFile)
  if (currentPosts.length >= minimumGeneratedPosts) return getBlogList(config.blogsStorageFile)

  if (!config.openRouterApiKey) {
    console.warn('OpenRouter generation skipped: NUXT_OPENROUTER_API_KEY is not configured.')
    return getBlogList(config.blogsStorageFile)
  }
  if (Date.now() < retryAfter) {
    console.warn('OpenRouter generation skipped: waiting for the retry cooldown to expire.')
    return getBlogList(config.blogsStorageFile)
  }

  if (!firstPostGeneration) {
    firstPostGeneration = (async () => {
      try {
        let generatedPosts = await getPublishedBlogs(config.blogsStorageFile)
        while (generatedPosts.length < minimumGeneratedPosts) {
          const topic = generatedPosts.length
            ? `Write a distinctly different article. Avoid repeating these existing titles: ${generatedPosts.map(post => post.title).join('; ')}`
            : ''
          const draft = await generateSkillBlogDraft(config.openRouterApiKey, topic)
          await publishBlog(config.blogsStorageFile, draft)
          generatedPosts = await getPublishedBlogs(config.blogsStorageFile)
        }
        retryAfter = 0
        return getBlogList(config.blogsStorageFile)
      } catch (error) {
        retryAfter = Date.now() + 60_000
        const failure = error as {
          statusCode?: number
          statusMessage?: string
          response?: { status?: number }
        }
        console.warn('OpenRouter blog generation failed; using public/blogs.json.', {
          statusCode: failure.response?.status ?? failure.statusCode,
          statusMessage: failure.statusMessage,
        })
        return getBlogList(config.blogsStorageFile)
      }
    })()
  }

  const pendingGeneration = firstPostGeneration
  try {
    return await pendingGeneration
  } finally {
    if (firstPostGeneration === pendingGeneration) firstPostGeneration = undefined
  }
})