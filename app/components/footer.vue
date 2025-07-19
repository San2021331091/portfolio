<template>
  <footer
    class="fixed bottom-0 left-0 w-full bg-blue-900 text-gray-300 py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-lg z-50 border-[#162d59]"
  >
    <div class="text-sm">&copy; 2025. All rights reserved.</div>
    <nav class="mt-2 md:mt-0 flex space-x-4 text-sm">
      <NuxtLink to="/" class="hover:text-white transition">Home</NuxtLink>
      <NuxtLink to="/about" class="hover:text-white transition">About</NuxtLink>
      <NuxtLink to="/contact" class="hover:text-white transition">Contact</NuxtLink>
    </nav>
  </footer>
</template>

<style scoped>
body {
  padding-bottom: 64px; 
}
</style>
