<template>
  <div class="w-full bg-void">
    <HeroSection />
    <ProjectSection />
    <AboutSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Page Transition setup could go here or in a middleware
useHead({
  title: 'ZAN | Creative Developer',
  meta: [
    { name: 'description', content: 'Portfolio of Zan, a creative developer specializing in Nuxt.js and GSAP.' }
  ]
})
</script>
