<template>
  <footer
    class="flex w-full flex-col items-center justify-between gap-3 border-t border-white/[0.08] bg-[#090d1b]/70 px-6 py-5 text-slate-400 sm:flex-row"
  >
    <div class="text-xs">&copy; 2025 Santosh Saha</div>
    <nav class="flex gap-5 text-xs">
      <NuxtLink to="/" class="transition hover:text-white">Home</NuxtLink>
      <NuxtLink to="/about" class="transition hover:text-white">About</NuxtLink>
      <NuxtLink to="/contact" class="transition hover:text-white">Contact</NuxtLink>
    </nav>
  </footer>
</template>
