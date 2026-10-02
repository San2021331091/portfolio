import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { getPublishedBlog } from '../../utils/blog-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const config = useRuntimeConfig(event)
  const post = slug ? await getPublishedBlog(config.blogsStorageFile, slug) : undefined

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Published blog post not found.' })
  }

  const rendered = await marked.parse(post.contentMarkdown)
  const contentHtml = sanitizeHtml(rendered, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'h1', 'h2', 'h3', 'h4', 'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'name', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  })

  return { ...post, contentHtml }
})