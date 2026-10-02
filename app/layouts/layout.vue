<template>
  <div class="site-shell flex min-h-screen flex-col text-white">
    <Navbar />

    <main class="flex-1 pt-16">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/navbar.vue';
import Footer from '@/components/footer.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  font-family: 'DM Sans', sans-serif;
  color-scheme: dark;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  background: #080b16;
}

.site-shell {
  background-color: #080b16;
  background-image:
    radial-gradient(ellipse at 12% 8%, rgb(37 99 235 / 16%), transparent 36rem),
    radial-gradient(ellipse at 88% 22%, rgb(124 58 237 / 13%), transparent 34rem),
    linear-gradient(180deg, #0b1020 0%, #080b16 48%, #0b0d19 100%);
}

h1,
h2,
h3,
nav {
  font-family: 'Space Grotesk', sans-serif;
}

::selection {
  color: white;
  background: #635bdb;
}
</style>
