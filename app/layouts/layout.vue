<template>
  <div class="min-h-screen bg-gradient-to-b from-[#0b2240] to-[#3b82f6] text-white">
    <Navbar />

    <!-- Scrollable content area, height = full screen - footer height -->
    <main class="pt-16 overflow-y-auto" :style="{ minHeight: 'calc(100vh - 64px)' }">
      <slot />
    </main>

    <!-- Fixed Footer at bottom -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/navbar.vue';
import Footer from '@/components/footer.vue';
</script>
