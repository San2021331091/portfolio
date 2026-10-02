<template>
  <section class="p-6 text-white mt-8 mb-32 sm:mb-40 md:mb-48 lg:mb-56 xl:mb-64">
    <h1 class="text-3xl font-bold mb-4 text-center">My Blog Posts</h1>
    <p class="text-center text-gray-300 max-w-xl mx-auto mb-10">
      Stay updated with the latest articles, tips, and tutorials about web development and modern technologies.
    </p>
    <p v-if="isGenerating" role="status" class="py-8 text-center text-sm text-slate-400">Loading…</p>
    <p v-else-if="generationError" role="alert" class="py-8 text-center text-sm text-rose-200">{{ generationError }}</p>
    <BlogCardList v-else :posts="posts" />
  </section>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import BlogCardList from '~/components/blogcardlist.vue'
import { usePublishedBlogs } from '~/composables/usePublishedBlogs'

useHead({
  title: 'My Blog Posts'
})

const { posts, isGenerating, generationError } = usePublishedBlogs()
</script>
