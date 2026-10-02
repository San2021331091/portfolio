<template>
  <section class="text-white pt-16 pb-32 px-4 md:px-10">
    <h2 class="text-2xl md:text-3xl font-bold mb-12 text-center">{{ title }}</h2>
    <p v-if="isGenerating" role="status" class="py-8 text-center text-sm text-slate-400">Loading…</p>
    <p v-else-if="generationError" role="alert" class="py-8 text-center text-sm text-rose-200">{{ generationError }}</p>
    <BlogCardList v-else :posts="latestBlogs" />
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { Blog } from '~/types/projects';
import BlogCardList from '~/components/blogcardlist.vue';
import { usePublishedBlogs } from '~/composables/usePublishedBlogs';

defineProps<{ title: string }>();

const { posts, isGenerating, generationError } = usePublishedBlogs();

const latestBlogs = computed(() =>
  [...posts.value]
    .filter(blog => !isNaN(Date.parse(blog.date))) // valid date check
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7)
);
</script>

