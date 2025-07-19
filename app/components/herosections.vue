<template>
  <section class="text-white flex items-center justify-center px-4 py-12">
    <div class="flex flex-col items-center text-center w-full max-w-5xl">
      <!-- Profile Image -->
      <img
        src="https://i.ibb.co/rG8x8htK/output-onlinepngtools.png"
        alt="Profile"
        class="w-32 h-32 sm:w-48 sm:h-48 rounded-full mb-6 border-4 border-white shadow-lg"
      />

      <!-- Description -->
      <h1 class="text-2xl sm:text-4xl font-bold mb-3">
  Hi, I'm
  <span class="text-green-500 ml-2 inline-block whitespace-nowrap">
    <span
      v-for="(char, index) in nameLetters"
      :key="index"
      class="inline-block"
      :style="{ opacity: index <= currentLetter ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </span>
  </span>
</h1>


      <p class="text-base sm:text-lg max-w-2xl mb-6 px-4 sm:px-0">
        I am a passionate developer crafting full-stack applications and creative digital experiences.
      </p>

      <!-- Social Links -->
      <div class="flex justify-center gap-6 mb-8">
        <!-- External links should stay <a> -->
        <a
          href="https://github.com/San2021331091"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="hover:opacity-80 transition"
        >
          <img src="https://i.ibb.co/VWY3LSzc/icons8-github-64.png" alt="GitHub" class="w-8 h-8" />
        </a>

        <a
          href="https://www.linkedin.com/in/santosh-saha-92b5b9309/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="hover:opacity-80 transition"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" class="w-8 h-8" />
        </a>

        <a
          href="https://www.facebook.com/santosh.saha.146257"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          class="hover:opacity-80 transition"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" class="w-8 h-8" />
        </a>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <NuxtLink
          to="/myprojects"
          class="bg-green-600 text-white font-semibold text-sm py-3 px-6 rounded-md shadow hover:bg-green-900 transition"
        >
          View Projects
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="bg-red-600 text-white font-semibold text-sm py-3 px-6 rounded-md shadow hover:bg-red-800 transition"
        >
          Contact Me
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const name:string = "Santosh Saha ";
const nameLetters:string[] = name.split("");
const currentLetter = ref<number>(-1);

onMounted(():void => {
  let index = 0

  setInterval(():void => {
    if (index < nameLetters.length) {
      currentLetter.value = index
      index++
    } else {
  
      currentLetter.value = -1
      index = 0
    }
  }, 150) 
})
</script>

