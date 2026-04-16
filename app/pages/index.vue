<template>
  <div>
    <!-- Preloader — exits via clip-path wipe -->
    <CoreAppPreloader @complete="onPreloaderComplete" />

    <!-- Main content — sections stacked vertically -->
    <main>
      <SectionsHeroSection :animate="heroAnimating" />
      <SectionsWorkSection />
      <SectionsAboutSection />
      <SectionsContactSection />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimations } from '~/composables/useScrollAnimations'

const heroAnimating = ref(false)

function onPreloaderComplete() {
  requestAnimationFrame(() => {
    heroAnimating.value = true
  })
}

useScrollAnimations()
</script>
