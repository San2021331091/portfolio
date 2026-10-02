<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="(project, index) in projects"
      :key="index"
      class="project-card flex flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-[#111628] shadow-xl shadow-black/10 transition duration-300"
    >
      <div class="overflow-hidden bg-slate-900">
        <img
          :src="project?.image"
          :alt="project?.title"
          class="project-image aspect-[16/10] w-full object-cover"
        />
      </div>

      <div class="flex flex-grow flex-col p-5">
        <h3 class="mb-2 text-lg font-semibold">{{ project?.title }}</h3>
        <p class="mb-5 text-sm leading-6 text-slate-400">{{ project?.description }}</p>

        <div class="mb-5 flex flex-wrap gap-2">
          <span
            v-for="tech in project?.technologies"
            :key="tech"
            class="rounded-md border border-indigo-300/10 bg-indigo-400/[0.08] px-2.5 py-1 text-xs text-indigo-100/80"
          >
            {{ tech }}
          </span>
        </div>

        <div class="mt-auto flex flex-wrap gap-5 text-sm text-slate-400">
          <a
            v-if="project?.repositoryLink"
            :href="project.repositoryLink"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 transition hover:text-white"
          >
            <CodeBracketIcon class="w-5 h-5" /> Code Link
          </a>

          <a
            v-if="project?.demoLink && project.demoLink !== ''"
            :href="project.demoLink"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 transition hover:text-white"
          >
            <ArrowTopRightOnSquareIcon class="w-5 h-5" /> Live Demo
          </a>
        </div>
      </div>
    </div>
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

<style scoped>
.project-card:hover {
  transform: translateY(-5px);
  border-color: rgb(129 140 248 / 28%);
}

.project-image {
  transition: transform 500ms ease;
}

.project-card:hover .project-image {
  transform: scale(1.035);
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-image {
    transition: none;
  }
}
</style>
