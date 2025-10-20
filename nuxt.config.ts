// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  // Enable SSG (Static Site Generation)
  ssr: true,

  // Deployment configuration
  app: {
    // Use root path for Vercel/Netlify, '/portfolio/' for GitHub Pages
    baseURL: '/',
    buildAssetsDir: 'assets',
  },

  // Target static for deployment
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})