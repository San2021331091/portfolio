import { schedule, validate } from 'node-cron'
import { runDailyBlogGeneration } from '../utils/daily-blog-scheduler'

interface SchedulerRuntime {
  __portfolioDailyBlogTask?: ReturnType<typeof schedule>
  __portfolioDailyBlogStartupRun?: Promise<void>
}

export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  const expression = config.blogGenerationCron
  const timezone = config.blogGenerationTimezone
  const runtime = globalThis as typeof globalThis & SchedulerRuntime

  if (!config.openRouterApiKey) {
    console.warn('Daily AI blog generation is disabled because OpenRouter is not configured.')
    return
  }

  if (!validate(expression)) {
    console.error(`Daily AI blog generation has an invalid cron expression: ${expression}`)
    return
  }

  try {
    runtime.__portfolioDailyBlogTask?.stop()
    const run = () => runDailyBlogGeneration({
      openRouterApiKey: config.openRouterApiKey,
      blogsStorageFile: config.blogsStorageFile,
      blogGenerationTimezone: timezone,
    }).catch(error => {
      console.error('Daily AI blog generation failed.', error)
    })

    if (!runtime.__portfolioDailyBlogStartupRun) {
      const startupRun = run()
      runtime.__portfolioDailyBlogStartupRun = startupRun
      void startupRun.finally(() => {
        if (runtime.__portfolioDailyBlogStartupRun === startupRun) {
          runtime.__portfolioDailyBlogStartupRun = undefined
        }
      })
    }

    runtime.__portfolioDailyBlogTask = schedule(expression, run, { timezone, noOverlap: true })
    console.info(`Daily AI blog generation scheduled with "${expression}" in ${timezone}.`)
  } catch (error) {
    console.error('Daily AI blog generation could not be scheduled.', error)
  }
})