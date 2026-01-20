// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  
  site: {
    url: 'https://zanio.xyz',
    name: 'Zanio Portfolio'
  },
  
  // Sitemap configuration
  sitemap: {
    // Default behavior is usually fine for static sites.
    // If we need dynamic routes, we can add them here or use a server route.
  },

  robots: {
    // Force standard robots.txt output
    groups: [
      {
        userAgent: ['*'],
        allow: '/',
        disallow: ['/api/']
      }
    ],
    // Disable any experimental or non-standard headers if they exist in defaults
    header: false 
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
      siteUrl: 'https://zanio.xyz'
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
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
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