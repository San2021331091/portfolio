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
    preset: 'node-server'
  },
  runtimeConfig: {
    openRouterApiKey: process.env.NUXT_OPENROUTER_API_KEY || process.env.NUXT_OPEN_ROUTER_API_KEY || '',
    blogAdminToken: process.env.NUXT_BLOG_ADMIN_TOKEN || '',
    blogsStorageFile: process.env.NUXT_BLOGS_STORAGE_FILE || '',
    blogGenerationCron: process.env.NUXT_BLOG_GENERATION_CRON || '0 9 * * *',
    blogGenerationTimezone: process.env.NUXT_BLOG_GENERATION_TIMEZONE || 'UTC',
    public: {
      EMAILJS_SERVICE_ID: process.env.NUXT_EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID: process.env.NUXT_EMAILJS_TEMPLATE_ID,
      EMAILJS_PUBLIC_KEY: process.env.NUXT_EMAILJS_PUBLIC_KEY,
    }
  }
})
