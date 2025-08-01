<script setup lang="ts">
import { ref, onMounted } from 'vue'
import WelcomeScreen from './components/WelcomeScreen.vue'

const showSplash = ref(true)

onMounted(() => {
  // Hide splash screen automatically after 5 seconds
  setTimeout(() => {
    showSplash.value = false
  }, 5000)
})
</script>

<template>
  <div>
    <WelcomeScreen v-if="showSplash" />

    <div v-else>
      <NuxtLayout name="layout">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
