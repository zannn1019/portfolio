<template>
  <article class="project-detail" v-if="project">
    <!-- Hero image header -->
    <div class="project-detail__hero">
      <img :src="project.image" :alt="project.title" class="project-detail__bg" />
      <div style="position: relative; z-index: 2; display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="project-detail__meta">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            <span class="tag">{{ project.year }}</span>
          </div>
        </div>
        <h1 class="project-detail__title font-display">
          {{ project.title }}
        </h1>
      </div>
    </div>
    
    <div style=" z-index: 500; padding: 1.5rem clamp(1.5rem, 5vw, 5rem); pointer-events: none;">
      <NuxtLink to="/" class="footer__link magnetic" style="pointer-events: all; display: inline-flex; align-items: center; gap: 0.5rem;">
        ← BACK
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="project-detail__content container">
      <!-- Left: description -->
      <div>
        <p class="contact__label" style="margin-bottom: 1.5rem;">OVERVIEW</p>
        <p class="about__body-text" style="max-width: 100%;">{{ project.fullDescription }}</p>
      </div>

      <!-- Right: meta info -->
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <p class="contact__label">ROLE</p>
          <p class="text-sm" style="color: rgba(255,255,255,0.7); margin-top: 0.5rem;">{{ project.role }}</p>
        </div>
        <div>
          <p class="contact__label">CLIENT</p>
          <p class="text-sm" style="color: rgba(255,255,255,0.7); margin-top: 0.5rem;">{{ project.client }}</p>
        </div>
        <div>
          <p class="contact__label">YEAR</p>
          <p class="text-sm" style="color: rgba(255,255,255,0.7); margin-top: 0.5rem;">{{ project.year }}</p>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div class="container" style="padding-bottom: var(--section-pad);">
      <div class="rule" style="margin-bottom: 2rem;" />
      <p class="contact__label" style="margin-bottom: 2rem;">DOCUMENTATION</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px; background: var(--color-border);">
        <div
          v-for="(img, i) in project.gallery"
          :key="i"
          style="background: var(--color-bg); overflow: hidden; aspect-ratio: 16/10;"
        >
          <img
            :src="img"
            :alt="`${project.title} — ${i + 1}`"
            style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(1.1); transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);"
            loading="lazy"
            @mouseenter="(e) => (e.target as HTMLElement).style.transform = 'scale(1.04)'"
            @mouseleave="(e) => (e.target as HTMLElement).style.transform = 'scale(1)'"
          />
        </div>
      </div>
    </div>
  </article>

  <!-- 404 state -->
  <div v-else class="section container" style="min-height: 100svh; display: flex; align-items: center; justify-content: center;">
    <div style="text-align: center;">
      <p class="font-display text-4xl">404</p>
      <p class="text-muted font-mono text-xs" style="margin-top: 1rem; letter-spacing: 0.2em;">PROJECT NOT FOUND</p>
      <NuxtLink to="/" class="btn magnetic" style="margin-top: 2rem; display: inline-flex;">
        <span>← RETURN</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePortfolioData } from '~/composables/usePortfolioData'

const route = useRoute()
const { getProjectBySlug, identity } = usePortfolioData()

const project = computed(() => getProjectBySlug(route.params.slug as string))

// SEO
useHead({
  title: project.value
    ? `${project.value.title} — ${identity.seo.siteName}`
    : `404 — ${identity.seo.siteName}`,
  meta: project.value
    ? [
        { name: 'description', content: project.value.fullDescription },
        { property: 'og:title', content: project.value.title },
        { property: 'og:image', content: project.value.image },
      ]
    : [],
})
</script>
