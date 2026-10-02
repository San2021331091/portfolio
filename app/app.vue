<script setup lang="ts">
import { onMounted, ref } from 'vue'
import WelcomeScreen from './components/WelcomeScreen.vue'

const route = useRoute()
const showWelcome = ref(route.path === '/')

onMounted(() => {
  if (!showWelcome.value) return

  window.setTimeout(() => {
    showWelcome.value = false
  }, 5000)
})
</script>

<template>
  <WelcomeScreen v-if="showWelcome" />
  <NuxtLayout v-else name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
