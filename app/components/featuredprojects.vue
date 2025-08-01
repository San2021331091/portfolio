<template>
  <section class="text-white py-16 px-4 md:px-10">
    <h2 class="text-2xl md:text-3xl font-bold mb-12 text-center">{{ title }}</h2>

    <div v-if="loading" class="text-center">Loading projects...</div>
    <div v-if="error" class="text-center text-red-500">Failed to load projects.</div>

    <Projects v-if="projects.length" :projects="projects" />
  </section>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import type { Project } from '~/types/projects';

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const projects = ref<Project[]>([])
    const loading = ref<Boolean>(true);
    const error = ref<Boolean>(false);

    onMounted(async () => {
      loading.value = true
      error.value = false
      try {
        const res = await fetch('https://flask-admin-6nf5.onrender.com/projects');
        if (!res.ok) throw new Error('Network response not ok');
        const json: Project[] = await res.json();
        projects.value = json.slice(0, 3);
      } catch (err) {
        console.error('Error fetching projects:', err);
        error.value = true;
      } finally {
        loading.value = false;
      }
    })

    return { projects, loading, error };
  }
}
</script>
