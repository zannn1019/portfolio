<template>
  <div>
    <!-- Preloader — exits via clip-path wipe -->
    <!-- <CoreAppPreloader @complete="onPreloaderComplete" /> -->

    <!-- Main content — sections stacked vertically -->
    <main>
      <SectionsHeroSection :animate="true" />
      <SectionsWorkSection />
      <SectionsAboutSection />
      <SectionsContactSection />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimations } from '~/composables/useScrollAnimations'

useScrollAnimations()
</script>
