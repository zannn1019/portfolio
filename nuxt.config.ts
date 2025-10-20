// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  // Enable SSG (Static Site Generation)
  ssr: true,

  // GitHub Pages configuration
  app: {
    baseURL: '/portfolio/',
    buildAssetsDir: 'assets',
  },

  // Target static for GitHub Pages
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})