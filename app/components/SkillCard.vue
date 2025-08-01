<template>
  <div
    :class="[
      'p-4 rounded-lg flex flex-col items-center shadow-md hover:-translate-y-2 hover:scale-105 transition-all duration-500',
      bgGradient
    ]"
  >
    <img :src="logo" :alt="label" class="h-12 w-12 object-contain mb-3" />
    <span class="text-gray-100 font-medium text-sm text-center">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
  label: string;
  logo: string;
}>();

// List of Tailwind gradient combinations
const gradients = [
  'bg-gradient-to-br from-green-800 to-blue-800',
  'bg-gradient-to-br from-purple-700 to-pink-700',
  'bg-gradient-to-br from-indigo-800 to-purple-800',
  'bg-gradient-to-br from-teal-700 to-cyan-700',
  'bg-gradient-to-br from-rose-700 to-fuchsia-700',
  'bg-gradient-to-br from-sky-800 to-violet-800',
  'bg-gradient-to-br from-blue-900 to-purple-900',
  'bg-gradient-to-br from-emerald-700 to-lime-700'
];

const bgGradient = ref(gradients[0]);

let intervalId: number;

onMounted(() => {
  intervalId = window.setInterval(() => {
    const random = Math.floor(Math.random() * gradients.length);
    bgGradient.value = gradients[random];
  }, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
