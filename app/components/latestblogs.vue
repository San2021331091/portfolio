<template>
  <section class="text-white py-16 px-4 md:px-10">
    <h2 class="text-2xl md:text-3xl font-bold mb-12 text-center">{{ title }}</h2>
    <BlogCardList :posts="latestBlogs" />
  </section>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Blog } from '~/types/projects';
import BlogCardList from '~/components/blogcardlist.vue';

defineProps<{ title: string }>();

const blogs = ref<Blog[]>([]);

onMounted(async () => {
  try {
    const res = await fetch('/blogs.json');
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const data = await res.json();
    blogs.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error loading blogs:', error);
  }
});

const latestBlogs = computed(() =>
  blogs.value
    .filter(blog => !isNaN(Date.parse(blog.date))) // valid date check
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
);
</script>

