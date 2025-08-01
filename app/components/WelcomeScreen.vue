<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 space-bg"
  >
    <ClientOnly>
      <Vue3Lottie
        :animationData="animationData"
        :loop="false"
        style="width: 100vw; height: 100vh; background: transparent;"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../assets/rocket_launch.json'
</script>

<style scoped>
.space-bg {
  background: linear-gradient(180deg, #000010 0%, #001f3f 50%, #000000 100%);
  position: fixed;
  inset: 0;
  overflow: hidden;
}


</style>
