<template>
  <nav
    class="fixed z-50 w-full border-b border-white/[0.08] bg-[#090d1b]/85 px-4 text-white shadow-lg shadow-black/10 backdrop-blur-xl"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between h-16">
      <NuxtLink to="/" class="inline-flex items-center gap-2.5 text-base font-semibold tracking-normal">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold shadow-lg shadow-indigo-950/40">S</span>
        Santosh Saha
        <span class="sr-only">home</span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <ul class="hidden items-center gap-1 md:flex">
        <li
          v-for="item in menuItems"
          :key="item.href"
          class="transition-colors duration-300 ease-in-out"
        >
          <NuxtLink
            :to="item.href"
            class="rounded-md px-3 py-2 text-sm transition-colors duration-300"
            :class="{
              'bg-white/[0.08] text-white': route.path === item.href,
              'text-slate-400 hover:bg-white/[0.05] hover:text-white': route.path !== item.href,
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile menu toggle -->
      <button
        @click="toggleMobileMenu"
        class="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-200 transition hover:bg-white/[0.08] md:hidden"
        aria-label="Toggle menu"
        :aria-expanded="isMobileMenuOpen"
      >
        <component
          :is="isMobileMenuOpen ? XMarkIcon : Bars3Icon"
          class="h-6 w-6 text-white"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <ul
      v-show="isMobileMenuOpen"
      class="mx-[-1rem] flex flex-col gap-1 border-t border-white/[0.08] bg-[#090d1b] px-5 pb-4 pt-3 md:hidden"
    >
      <li
        v-for="item in menuItems"
        :key="item.href"
          class="transition-colors duration-300 ease-in-out"
      >
        <NuxtLink
          :to="item.href"
          class="block rounded-md px-3 py-2 text-sm transition-colors duration-300"
          :class="{
            'bg-white/[0.08] text-white': route.path === item.href,
            'text-slate-400 hover:bg-white/[0.05] hover:text-white': route.path !== item.href,
          }"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useRoute } from "vue-router";

const isMobileMenuOpen = ref<boolean>(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const route = useRoute();

watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});

const menuItems: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/myprojects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];
</script>
