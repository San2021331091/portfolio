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


<!-- Skills Section -->
<section>
  <h2 class="text-3xl font-semibold text-center mb-10">Skills</h2>

  <!-- Languages -->
  <div class="mb-16">
    <h3 class="text-2xl font-bold text-blue-400 mb-6 text-center">Languages</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
      <SkillCard label="C" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" />
      <SkillCard label="C++" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" />
      <SkillCard label="Fortran" logo="https://i.postimg.cc/13zNtspc/Screenshot-2025-08-01-173525.png" />
      <SkillCard label="Java" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
      <SkillCard label="Kotlin" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" />
      <SkillCard label="JavaScript" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
      <SkillCard label="TypeScript" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
      <SkillCard label="PHP" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" />
      <SkillCard label="Dart" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" />
      <SkillCard label="C#" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" />
      <SkillCard label="Python" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />
      <SkillCard label="Go" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" />
    </div>
  </div>

  <!-- Frontend -->
  <div class="mb-16">
    <h3 class="text-2xl font-bold text-green-400 mb-6 text-center">Frontend</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
      <SkillCard label="React" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
      <SkillCard label="React Native" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
      <SkillCard label="Jetpack Compose" logo="https://i.postimg.cc/jqkp9hMx/jetpackcompose-original-8x.png/" />
      <SkillCard label="JavaFX" logo="https://i.postimg.cc/QxYnVN2j/javafx.png" />
      <SkillCard label="Flutter" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" />
      <SkillCard label="Vue.js" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" />
      <SkillCard label="Nuxt.js" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" />
      <SkillCard label="Tailwind CSS" logo="https://i.postimg.cc/GpKLsyd4/twcss.png" />
      <SkillCard label="HTML5" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
      <SkillCard label="CSS3" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
    </div>
  </div>

  <!-- Backend & Tools -->
  <div>
    <h3 class="text-2xl font-bold text-purple-400 mb-6 text-center">Backend & Tools</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
      <SkillCard label="Node.js" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
      <SkillCard label="Express" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
      <SkillCard label="Fastify" logo="https://i.postimg.cc/VkND8yv2/fastify.png/" />
      <SkillCard label="Fiber" logo="https://i.postimg.cc/MKDLybgb/fiber.png" />
      <SkillCard label="SlimPHP" logo="https://i.postimg.cc/8cPTHPkZ/Screenshot-2025-08-01-173707.png/" />
      <SkillCard label="Flask" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" />
      <SkillCard label="PostgreSQL" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
      <SkillCard label="MongoDB" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
      <SkillCard label="GitHub" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
      <SkillCard label="Docker" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
      <SkillCard label="AWS" logo="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png" />
      <SkillCard label="CI/CD" logo="https://i.postimg.cc/L4wyj49D/ci.png" />
    </div>
  </div>
  <div class="mt-8 flex justify-center">
  <button
    class="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white font-semibold shadow-md
           hover:bg-green-700 active:scale-95 transition-all duration-200"
    onclick="window.location.href='https://drive.google.com/uc?export=download&id=1yy9JeRTFp79qW8hxuJTi0-4tFAPQLlji';"
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

useHead({
  title: 'About Me'
});
</script>

