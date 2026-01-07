// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  
  site: {
    url: 'https://webzan.my.id',
    name: 'WebZan Portfolio'
  },
  
  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ]
  },

  image: {
    domains: ['images.unsplash.com']
  },
  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Runtime configuration
  runtimeConfig: {
    // Private keys (server-side only)
    web3formsAccessKey: '', // Set via WEB3FORMS_ACCESS_KEY env variable
    // Public keys (exposed to client)
    public: {
      siteUrl: 'https://webzan.my.id'
    }
  },

  // Enable SSG (Static Site Generation)
  ssr: true,

  // Deployment configuration
  app: {
    // Use root path for Vercel/Netlify, '/portfolio/' for GitHub Pages
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  srcDir: 'app',

  // Target static for deployment
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  // SEO & Performance
  experimental: {
    payloadExtraction: false
  },

  // Enable compression
  routeRules: {
    '/': { prerender: true }
  }
})