<template>
  <section class="p-6 text-white mt-8 mb-32 sm:mb-40 md:mb-48 lg:mb-56 xl:mb-64">
    <h1 class="text-3xl font-bold mb-4 text-center">My Blog Posts</h1>
    <p class="text-center text-gray-300 max-w-xl mx-auto mb-10">
      Stay updated with the latest articles, tips, and tutorials about web development and modern technologies.
    </p>
    <BlogCardList :posts="blogPosts" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '#imports'
import BlogCardList from '~/components/blogcardlist.vue'
import type { Blog } from '~/types/projects'

useHead({
  title: 'My Blog Posts'
})

const blogPosts = ref<Blog[]>([])

onMounted(async () => {
  try {
    const res = await fetch('/blogs.json')
    if (!res.ok) throw new Error('Failed to fetch blogs')
    const data = await res.json()
    blogPosts.value = data
  } catch (err) {
    console.error('Error loading blogs:', err)
  }
})
</script>
