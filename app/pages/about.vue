<template>
  <div class="text-white px-4 py-12 pb-32">

    <!-- About Me Section -->
    <section class="text-center mb-16 px-4">
      <h2 class="text-3xl font-semibold mb-4">About Me</h2>
      <p class="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
        I'm a web and app developer currently studying Computer Science and Engineering at
        <span class="text-white font-semibold">Shahjalal University of Science and Technology (SUST)</span>.
        I’m actively developing modern web and mobile applications using a wide stack of frontend and backend technologies.
      </p>
    </section>

    <!-- Education Section -->
    <section class="text-center mb-16 px-4">
      <h2 class="text-3xl font-semibold mb-4">Education</h2>
      <div class="max-w-2xl mx-auto text-gray-300 text-lg space-y-2">
        <p><span class="font-bold text-white">HSC (2021):</span> GPA 5.00</p>
          <p><span class="font-bold text-white">Institution: St. Gregory High School and College</span></p>
        <p><span class="font-bold text-white">BSc in Computer Science & Engineering (2023 - 2025):</span> SUST</p>
      </div>
    </section>


<section>
  <h2 class="text-3xl font-semibold text-center mb-10">Skills</h2>

  <div v-for="group in skillGroups" :key="group.title" class="mb-16">
    <h3 class="text-2xl font-bold mb-6 text-center" :class="group.headingClass">{{ group.title }}</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
      <SkillCard
        v-for="(skill, index) in group.skills"
        :key="`${skill.label}-${index}`"
        :label="skill.label"
        :logo="skill.logo"
      />
    </div>
  </div>
  <div class="mt-8 flex justify-center">
  <button
    class="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white font-semibold shadow-md
           hover:bg-green-700 active:scale-95 transition-all duration-200"
    onclick="window.location.href='https://drive.google.com/file/d/1o91B1WW1SqcrWQNoqKsnm67zoALWVEOu/view?usp=sharing';"
  >
    Download My CV
  </button>
</div>

</section>


  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
import SkillCard from '~/components/SkillCard.vue';
import { skillGroups } from '~/data/skills'

useHead({
  title: 'About Me'
});
</script>

