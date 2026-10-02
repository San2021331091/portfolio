import { generateSkillBlogDraft } from './generate-skill-blog'
import { getPublishedBlogs, publishBlog } from './blog-store'

interface DailyBlogScheduleConfig {
  openRouterApiKey: string
  blogsStorageFile: string
  blogGenerationTimezone: string
}

let activeRun: Promise<void> | undefined

export async function runDailyBlogGeneration(config: DailyBlogScheduleConfig): Promise<void> {
  if (activeRun) return activeRun

  const run = (async () => {
    const dateParts = new Intl.DateTimeFormat('en-US', {
      timeZone: config.blogGenerationTimezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date())
    const getPart = (type: string) => dateParts.find(part => part.type === type)?.value ?? ''
    const runDate = `${getPart('year')}-${getPart('month')}-${getPart('day')}`
    const existingPosts = await getPublishedBlogs(config.blogsStorageFile)
    if (existingPosts.some(post => post.date === runDate)) return

    const topic = existingPosts.length
      ? `Write a new daily article based on the listed skills. Avoid repeating these existing titles: ${existingPosts.slice(0, 10).map(post => post.title).join('; ')}`
      : ''
    const draft = await generateSkillBlogDraft(config.openRouterApiKey, topic)
    const post = await publishBlog(config.blogsStorageFile, draft)
    console.info(`Daily AI blog post published: ${post.slug}`)
  })()

  activeRun = run
  try {
    await run
  } finally {
    if (activeRun === run) activeRun = undefined
  }
}