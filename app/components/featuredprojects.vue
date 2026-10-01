```vue
<template>
  <section class="text-white py-16 px-4 md:px-10">
    <h2 class="text-2xl md:text-3xl font-bold mb-12 text-center">
      {{ title }}
    </h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center">
      Loading projects...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-500">
      Failed to load projects.
    </div>

    <!-- Empty -->
    <div v-else-if="!projects.length" class="text-center">
      No projects available.
    </div>

    <!-- Projects -->
    <Projects
      v-else
      :projects="projects"
    />
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
    const projects = ref<Project[]>([]);
    const loading = ref<boolean>(true);
    const error = ref<boolean>(false);

    onMounted(async () => {
      loading.value = true;
      error.value = false;

      try {
        const res = await fetch(
          'https://portfolio-admin-jet-nine.vercel.app/projects'
        );

        if (!res.ok) {
          throw new Error('Network response not ok');
        }

        const json: Project[] = await res.json();

        // Step 1: Sort projects by latest ID
        const latestProjects = [...json]
          .sort((a, b) => b.id - a.id)
          .slice(0, 3);

        // Step 2: Randomize the order of latest 3 projects
        for (let i = latestProjects.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));

          [latestProjects[i], latestProjects[j]] = [
            latestProjects[j],
            latestProjects[i]
          ];
        }

        // Step 3: Update projects
        projects.value = latestProjects;

      } catch (err) {
        console.error('Error fetching projects:', err);
        error.value = true;
      } finally {
        loading.value = false;
      }
    });

    return {
      projects,
      loading,
      error
    };
  }
};
</script>
```
