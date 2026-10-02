import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import defaultBlogData from '../../public/blogs.json'
import type { Blog } from '../../app/types/projects'

export interface PublishedBlog extends Blog {
  hasArticle: true
  contentMarkdown: string
}

export interface NewPublishedBlog {
  title: string
  excerpt: string
  contentMarkdown: string
}

let writeQueue: Promise<unknown> = Promise.resolve()

function getStoragePath(storageFile: string): string {
  return resolve(process.cwd(), storageFile.trim() || '.data/blog-posts.json')
}

async function readStoredBlogs(storageFile: string): Promise<PublishedBlog[]> {
  try {
    const contents = await readFile(getStoragePath(storageFile), 'utf8')
    const blogs: unknown = JSON.parse(contents)
    if (!Array.isArray(blogs)) throw new Error('Blog store must contain an array.')
    return blogs as PublishedBlog[]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw error
  }
}

export async function getPublishedBlogs(storageFile: string): Promise<Blog[]> {
  const blogs = await readStoredBlogs(storageFile)

  return blogs
    .map(({ contentMarkdown: _contentMarkdown, ...blog }) => blog)
    .sort((first, second) => second.date.localeCompare(first.date))
}

export async function getDefaultBlogs(): Promise<Blog[]> {
  return defaultBlogData as Blog[]
}

export async function getBlogList(storageFile: string): Promise<Blog[]> {
  const [publishedBlogs, defaultBlogs] = await Promise.all([
    getPublishedBlogs(storageFile),
    getDefaultBlogs(),
  ])
  const publishedSlugs = new Set(publishedBlogs.map(blog => blog.slug))

  return [...publishedBlogs, ...defaultBlogs.filter(blog => !publishedSlugs.has(blog.slug))]
    .sort((first, second) => second.date.localeCompare(first.date))
}

export async function getPublishedBlog(storageFile: string, slug: string): Promise<PublishedBlog | undefined> {
  const blogs = await readStoredBlogs(storageFile)
  return blogs.find(blog => blog.slug === slug)
}

export function publishBlog(storageFile: string, input: NewPublishedBlog): Promise<PublishedBlog> {
  const save = async (): Promise<PublishedBlog> => {
    const path = getStoragePath(storageFile)
    const blogs = await readStoredBlogs(storageFile)
    const baseSlug = input.title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) || 'blog-post'

    let slug = baseSlug
    let suffix = 2
    while (blogs.some(blog => blog.slug === slug)) {
      slug = `${baseSlug}-${suffix++}`
    }

    const wordCount = input.contentMarkdown.trim().split(/\s+/).length
    const post: PublishedBlog = {
      ...input,
      date: new Date().toISOString().slice(0, 10),
      readTime: `${Math.max(1, Math.ceil(wordCount / 200))} min`,
      slug,
      hasArticle: true,
    }

    await mkdir(dirname(path), { recursive: true })
    const temporaryPath = `${path}.${process.pid}.tmp`
    await writeFile(temporaryPath, JSON.stringify([post, ...blogs], null, 2), 'utf8')
    await rename(temporaryPath, path)
    return post
  }

  const operation = writeQueue.then(save, save)
  writeQueue = operation.then(() => undefined, () => undefined)
  return operation
}