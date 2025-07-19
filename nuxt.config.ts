export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  pages: true,
  components: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt'
  ],
  nitro: {
    preset: 'static'
  },
  runtimeConfig: {
    public: {
      EMAILJS_SERVICE_ID: process.env.NUXT_EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID: process.env.NUXT_EMAILJS_TEMPLATE_ID,
      EMAILJS_PUBLIC_KEY: process.env.NUXT_EMAILJS_PUBLIC_KEY,
    }
  }
})
