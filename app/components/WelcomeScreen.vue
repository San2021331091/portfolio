<template>
  <div class="fixed inset-0 bg-gradient-to-b from-[#000010] via-[#001f3f] to-black flex items-center justify-center space-bg relative overflow-hidden">
    
    <!-- Mercury -->
    <div class="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-gray-500 to-gray-700 top-6 left-6 shadow-sm"></div>

    <!-- Venus -->
    <div class="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 top-24 left-16 shadow-md"></div>

    <!-- Earth -->
    <div class="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-500 to-green-500 top-1/3 left-1/5 shadow-[0_0_10px_2px_rgba(0,128,255,0.5)]">
      <!-- Moon -->
      <div class="absolute top-1/2 left-1/2 animate-orbit">
        <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 shadow-sm"></div>
      </div>
    </div>

    <!-- Mars -->
    <div class="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-red-600 to-red-800 top-[70%] left-[10%] shadow-[0_0_10px_2px_rgba(255,69,0,0.5)]"></div>

    <!-- Jupiter -->
    <div class="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-orange-300 to-orange-600 top-10 right-[30%] shadow-[0_0_14px_2px_rgba(255,165,0,0.6)]"></div>

    <!-- Saturn with ring -->
    <div class="absolute top-1/2 right-10 sm:right-20 w-20 h-20 sm:w-24 sm:h-24">
      <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-600 to-yellow-800 shadow-lg"></div>
      <div class="absolute top-1/2 left-1/2 w-28 sm:w-36 h-4 sm:h-6 border-2 sm:border-4 border-yellow-200 rounded-full -translate-x-1/2 -translate-y-1/2 rotate-12 opacity-50"></div>
    </div>

    <!-- Uranus -->
    <div class="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-teal-400 to-teal-700 bottom-24 left-24 shadow-[0_0_10px_2px_rgba(64,224,208,0.4)]"></div>

    <!-- Neptune -->
    <div class="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-900 bottom-6 right-8 shadow-[0_0_10px_2px_rgba(25,25,112,0.4)]"></div>

    <!-- Asteroids -->
    <div class="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 opacity-50 top-1/2 left-[15%] shadow-[0_0_4px_1px_rgba(200,200,200,0.3)]"></div>
    <div class="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-400 opacity-40 top-[25%] left-[70%] shadow-[0_0_4px_1px_rgba(180,180,180,0.3)]"></div>
    <div class="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500 opacity-30 bottom-[20%] right-[30%] shadow-[0_0_4px_1px_rgba(160,160,160,0.3)]"></div>
    <div class="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 opacity-50 top-[60%] right-[80%] shadow-[0_0_4px_1px_rgba(170,170,170,0.3)]"></div>

    <!-- Rocket Animation -->
    <ClientOnly>
      <Vue3Lottie
        :animationData="animationData"
        :loop="false"
        class="w-full h-full bg-transparent relative z-10"
      />
    </ClientOnly>
  </div>
</template>




<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import animationData from '../assets/rocket_launch.json'
</script>

<style scoped>
@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(20px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(20px) rotate(-360deg);
  }
}
.animate-orbit {
  animation: orbit 6s linear infinite;
  transform-origin: left center;
}
</style>
