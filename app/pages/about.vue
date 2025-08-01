<template>
  <div class="text-white px-4 py-12 pb-32">

    <!-- About Me Section -->
    <section class="text-center mb-16 px-4">
      <h2 class="text-3xl font-semibold mb-4">About Me</h2>
      <p class="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
        I'm a web and app developer currently studying Computer Science and Engineering at
        <span class="text-white font-semibold">Shahjalal University of Science and Technology (SUST)</span>.
        I passed my HSC in 2021 with a perfect GPA of 5.00.
        I’m actively developing modern web and mobile applications using a wide stack of frontend and backend technologies.
      </p>
    </section>

    <!-- Education Section -->
    <section class="text-center mb-16 px-4">
      <h2 class="text-3xl font-semibold mb-4">Education</h2>
      <div class="max-w-2xl mx-auto text-gray-300 text-lg space-y-2">
        <p><span class="font-bold text-white">St. Gregory High School and College:</span> Passed HSC</p>
        <p><span class="font-bold text-white">HSC (2021):</span> GPA 5.00</p>
        <p><span class="font-bold text-white">BSc in Computer Science & Engineering (2023 - 2025):</span> SUST</p>
      </div>
    </section>

    <!-- Skills Section -->
    <section>
      <h2 class="text-3xl font-semibold text-center mb-10">Skills</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">

        <!-- Languages -->
        <div
          class="bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:bg-blue-900 hover:-translate-y-2 hover:scale-105"
        >
          <h3 class="text-xl font-bold mb-4 text-blue-400">Languages</h3>
          <ul class="space-y-1 text-gray-300">
            <li>C</li>
            <li>C++</li>
            <li>Fortran</li>
            <li>Java</li>
            <li>Kotlin</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>PHP</li>
            <li>C#</li>
            <li>Python</li>
            <li>Go</li>
          </ul>
        </div>

        <!-- Frontend -->
        <div
          class="bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:bg-green-900 hover:-translate-y-2 hover:scale-105"
        >
          <h3 class="text-xl font-bold mb-4 text-green-400">Frontend</h3>
          <ul class="space-y-1 text-gray-300">
            <li>React</li>
            <li>React Native</li>
            <li>Jetpack Compose</li>
            <li>JavaFX</li>
            <li>Vue.js</li>
            <li>Nuxt.js</li>
            <li>Tailwind CSS</li>
            <li>HTML5 / CSS3</li>
          </ul>
        </div>

        <!-- Backend and Tools -->
        <div
          class="bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:bg-purple-900 hover:-translate-y-2 hover:scale-105"
        >
          <h3 class="text-xl font-bold mb-4 text-purple-400">Backend & Tools</h3>
          <ul class="space-y-1 text-gray-300">
            <li>Node.js</li>
            <li>Express</li>
            <li>Fastify</li>
            <li>Fiber</li>
            <li>SlimPHP</li>
            <li>Flask</li>
            <li>PostgreSQL</li>
            <li>MongoDB</li>
            <li>Git / GitHub</li>
            <li>Docker</li>
            <li>AWS</li>
            <li>CI/CD</li>
          </ul>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';

useHead({
  title: 'About Me'
});
</script>
