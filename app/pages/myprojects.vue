<template> 
  <!-- 📝 Descriptive Intro Section --> 
  <section class="py-12 px-4 md:px-10 text-gray-300">
    <div class="max-w-4xl mx-auto space-y-6">
      <h1 class="text-2xl md:text-3xl font-bold text-center text-white">My Projects</h1>
      <p>
        Welcome to my project showcase! These projects demonstrate my skills in full-stack web development,
        modern frontend frameworks, and responsive design. I am passionate about building real-world applications
        that solve problems and deliver great user experiences.
      </p>
      <p>
        Scroll down to explore some of the key projects I have built!
      </p>
    </div>
  </section>

  <!-- 📁 Projects Section -->
  <section class="py-16 px-4 md:px-10 text-white mb-32 sm:mb-40 md:mb-48 lg:mb-56 xl:mb-64">
    <div v-if="loading" class="text-center">Loading projects...</div>
    <div v-if="error" class="text-center text-red-500">Failed to load projects.</div>
    <Projects v-if="projects.length" :projects="projects" />
  </section>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import { ref, onMounted } from 'vue'
import type { Project } from '~/types/projects'

useHead({
  title:"My Projects"
})

const projects = ref<Project[]>([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  loading.value = true
  error.value = false
  try {
    const res = await fetch('/projects.json')
    if (!res.ok) throw new Error('Network error')
    const json: Project[] = await res.json()
    projects.value = json
  } catch (e) {
    error.value = true
    console.error('Error fetching projects:', e)
  } finally {
    loading.value = false
  }
})
</script>
