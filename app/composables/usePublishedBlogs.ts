import { onMounted, ref } from 'vue'
import type { Blog } from '~/types/projects'

export function usePublishedBlogs() {
  const { data: posts, refresh } = useFetch<Blog[]>('/api/blogs', { default: () => [] })
  const isGenerating = ref(posts.value.length === 0)
  const generationError = ref('')

  onMounted(async () => {
    isGenerating.value = posts.value.length === 0
    try {
      await $fetch('/api/blogs/ensure', { method: 'POST' })
      await refresh()
    } catch (error) {
      const requestError = error as { data?: { statusMessage?: string }; message?: string }
      if (!posts.value.length) {
        generationError.value = requestError.data?.statusMessage ?? requestError.message ?? 'Could not generate an article.'
      }
    } finally {
      isGenerating.value = false
    }
  })

  return { posts, isGenerating, generationError }
}