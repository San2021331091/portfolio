<template>
  <nav
    class="fixed w-full bg-blue-900 backdrop-blur-sm z-50 text-white px-4 border-b border-[#162d59]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between h-16">
      <h3 class="text-lg font-bold">
        Portfolio<span class="text-sm align-super">™</span>
      </h3>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-6 ml-6">
        <li
          v-for="item in menuItems"
          :key="item.href"
          class="transition-colors duration-300 ease-in-out last:mr-6"
        >
          <NuxtLink
            :to="item.href"
            class="transition-colors duration-300 ease-in-out"
            :class="{
              'text-blue-300 font-semibold': route.path === item.href,
              'hover:text-gray-300 text-white': route.path !== item.href,
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile menu toggle -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden focus:outline-none"
        aria-label="Toggle menu"
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
      class="md:hidden flex flex-col bg-[#0b2240] px-4 pb-4 space-y-2"
    >
      <li
        v-for="item in menuItems"
        :key="item.href"
        class="transition-colors duration-300 ease-in-out last:mb-3"
      >
        <NuxtLink
          :to="item.href"
          class="block py-2 transition-colors duration-300 ease-in-out"
          :class="{
            'text-blue-400 font-semibold': route.path === item.href,
            'hover:text-gray-300 text-white': route.path !== item.href,
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

const menuItems: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/myprojects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];
</script>
