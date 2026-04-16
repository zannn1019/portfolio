export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: { compatibilityVersion: 4 },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'ZAN',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'System-Oriented Fullstack Developer. Nuxt.js, Laravel, and GSAP-driven interfaces shaped into high-contrast systems that feel fast, deliberate, and alive.',
        },
        { name: 'theme-color', content: '#000000' },
        { property: 'og:title', content: 'ZAN.SYS — Ahmad Fauzan' },
        {
          property: 'og:description',
          content: 'System-Oriented Fullstack Developer. Nuxt.js, Laravel, GSAP-driven interfaces.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://zanio.xyz' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@zannn1019' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'wipe', mode: 'out-in' },
  },

  vite: {
    optimizeDeps: {
      include: [
        'three',
        'lenis',
        'gsap',
        'gsap/ScrollTrigger',
      ],
    },
    assetsInclude: ['**/*.vert', '**/*.frag', '**/*.glsl'],
  },
})
