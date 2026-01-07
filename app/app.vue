<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useSeoMeta, useHead } from "#imports"

useSeoMeta({
  title: 'System Administrator & Creative Developer',
  titleTemplate: '%s | WebZan - Ahmad Fauzan',
  description: 'Pro portfolio of Ahmad Fauzan (WebZan). System Administrator and Fullstack Developer specializing in Nuxt, Laravel, and Cyber-System aesthetics.',
  ogTitle: 'WebZan | Ahmad Fauzan - System Authority',
  ogDescription: 'Verified competencies in System Administration and Creative Development. Explore the cyber-industrial portfolio.',
  ogImage: 'https://webzan.my.id/og-image.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: 'WebZan | Ahmad Fauzan',
  twitterDescription: 'System Administrator & Creative Developer.',
  twitterImage: 'https://webzan.my.id/og-image.jpg'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ahmad Fauzan",
        "alternateName": "WebZan",
        "url": "https://webzan.my.id",
        "jobTitle": "System Administrator",
        "sameAs": [
          "https://github.com/zannn1019",
          "https://www.linkedin.com/in/ahmad-fauzan-49674a2a0"
        ]
      })
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://webzan.my.id' }
  ]
})
</script>
