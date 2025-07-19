<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="(post, index) in posts"
      :key="index"
      class="bg-gray-900 hover:bg-gray-800 transition rounded-xl p-6 space-y-3 shadow"
    >
      <h3 class="text-lg font-semibold">{{ post?.title }}</h3>
      <p class="text-gray-400 text-sm">{{ post?.excerpt }}</p>
      <div class="text-gray-500 text-xs flex items-center gap-4">
        <span class="flex items-center gap-1">
          <CalendarIcon class="w-4 h-4" /> {{ post?.date }}
        </span>
        <span class="flex items-center gap-1">
          <ClockIcon class="w-4 h-4" /> {{ post?.readTime }}
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
