<template>
  <p v-if="!posts.length" class="py-8 text-center text-sm text-slate-400">No published articles yet.</p>
  <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="post in posts"
      :key="post.slug"
      class="blog-card space-y-3 rounded-lg border border-white/[0.08] bg-[#111628] p-5 shadow-lg shadow-black/10 transition duration-300"
    >
      <h3 class="text-base font-semibold leading-6">
        <NuxtLink v-if="post.hasArticle" :to="`/blogs/${post.slug}`" class="transition hover:text-emerald-200">
          {{ post.title }}
        </NuxtLink>
        <span v-else>{{ post.title }}</span>
      </h3>
      <p class="text-sm leading-6 text-slate-400">{{ post.excerpt }}</p>
      <div class="flex items-center gap-4 pt-1 text-xs text-slate-500">
        <span class="flex items-center gap-1">
          <CalendarIcon class="w-4 h-4" /> {{ post.date }}
        </span>
        <span class="flex items-center gap-1">
          <ClockIcon class="w-4 h-4" /> {{ post.readTime }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon, ClockIcon } from '@heroicons/vue/24/outline'
import type { Blog } from '~/types/projects';
defineProps<{
  posts: Blog[]
}>()
</script>

<style scoped>
.blog-card:hover {
  transform: translateY(-4px);
  border-color: rgb(129 140 248 / 28%);
  background: #151b30;
}

@media (prefers-reduced-motion: reduce) {
  .blog-card {
    transition: none;
  }
}
</style>
