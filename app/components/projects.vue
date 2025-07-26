<!-- components/Projects.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <v-motion
      v-for="(project, index) in projects"
      :key="index"
      tag="div"
      :initial="{ opacity: 0, y: 50 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.2,
          duration: 0.6,
          ease: 'easeOut'
        }
      }"
      while-hover="hover"
      class="bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 flex flex-col"
      :variants="{
        hover: {
          rotate: [0, -2, 2, -2, 2, 0],
          transition: {
            duration: 0.6,
            repeat: 0,
            ease: 'easeInOut'
          }
        }
      }"
    >
      <img :src="project?.image" :alt="project?.title" class="w-full h-48 object-cover" />

      <div class="p-5 flex flex-col flex-grow">
        <h3 class="text-xl font-semibold mb-2">{{ project?.title }}</h3>
        <p class="text-gray-400 text-sm mb-4">{{ project?.description }}</p>

        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tech in project?.technologies"
            :key="tech"
            class="bg-blue-800 text-xs px-3 py-1 rounded-full"
          >
            {{ tech }}
          </span>
        </div>

        <div class="flex gap-4 text-sm text-gray-400 mt-auto">
          <a
            v-if="project?.repositoryLink"
            :href="project.repositoryLink"
            target="_blank"
            class="flex items-center gap-1 hover:text-white"
          >
            <CodeBracketIcon class="w-5 h-5" /> Code Link
          </a>

          <a
            v-if="project?.demoLink && project.demoLink !== ''"
            :href="project.demoLink"
            target="_blank"
            class="flex items-center gap-1 hover:text-white"
          >
            <ArrowTopRightOnSquareIcon class="w-5 h-5" /> Live Demo
          </a>
        </div>
      </div>
    </v-motion>
  </div>
</template>

<script setup lang="ts">
import { CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { defineProps } from 'vue'
import type { Project } from '~/types/projects'

defineProps<{
  projects: Project[]
}>()
</script>
