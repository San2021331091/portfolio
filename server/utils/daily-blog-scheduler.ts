import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { generateSkillBlogDraft } from './generate-skill-blog'
import { getPublishedBlogs, publishBlog } from './blog-store'

interface DailyBlogScheduleConfig {
  openRouterApiKey: string
  blogsStorageFile: string
  blogGenerationTimezone: string
}

interface DailyBlogScheduleState {
  lastRunDate?: string
}

let activeRun: Promise<void> | undefined

function getLocalDate(timezone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const part = (type: string) => parts.find(value => value.type === type)?.value ?? ''

  return `${part('year')}-${part('month')}-${part('day')}`
}

function getStatePath(storageFile: string): string {
  const storePath = resolve(process.cwd(), storageFile.trim() || '.data/blog-posts.json')
  return `${storePath}.daily-schedule.json`
}

async function readState(path: string): Promise<DailyBlogScheduleState> {
  try {
    return JSON.parse(await readFile(path, 'utf8')) as DailyBlogScheduleState
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {}
    throw error
  }
}

async function saveRunDate(path: string, date: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, JSON.stringify({ lastRunDate: date }), 'utf8')
}

export async function runDailyBlogGeneration(config: DailyBlogScheduleConfig): Promise<void> {
  if (activeRun) return activeRun

  const run = (async () => {
    const runDate = getLocalDate(config.blogGenerationTimezone)
    const statePath = getStatePath(config.blogsStorageFile)
    const state = await readState(statePath)
    if (state.lastRunDate === runDate) return

    const existingPosts = await getPublishedBlogs(config.blogsStorageFile)
    if (existingPosts.some(post => post.date === runDate)) {
      await saveRunDate(statePath, runDate)
      return
    }

    const topic = existingPosts.length
      ? `Write a new daily article based on the listed skills. Avoid repeating these existing titles: ${existingPosts.slice(0, 10).map(post => post.title).join('; ')}`
      : ''
    const draft = await generateSkillBlogDraft(config.openRouterApiKey, topic)
    const post = await publishBlog(config.blogsStorageFile, draft)
    await saveRunDate(statePath, runDate)
    console.info(`Daily AI blog post published: ${post.slug}`)
  })()

  activeRun = run
  try {
    await run
  } finally {
    if (activeRun === run) activeRun = undefined
  }
}