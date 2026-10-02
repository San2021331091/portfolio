import { getBlogList } from '../utils/blog-store'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  const config = useRuntimeConfig(event)
  return getBlogList(config.blogsStorageFile)
})