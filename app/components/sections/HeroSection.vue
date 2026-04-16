<template>
  <section id="hero" class="hero">
    <!-- WebGL Noise Field Canvas -->
    <canvas ref="canvasEl" class="hero__canvas" />

    <div class="hero__content">
      <!-- Eyebrow label -->
      <p class="hero__eyebrow" ref="eyebrowEl">
        {{ identity.hero.label }}
      </p>

      <!-- Main title — each word is split for animation -->
      <h1 class="hero__title" ref="titleEl">
        <span class="hero__title-line overflow-clip">
          <span class="hero__title-word font-display">{{ identity.personal.firstName }}</span>
        </span>
        <span class="hero__title-line overflow-clip">
          <span class="hero__title-word font-display">{{ identity.personal.lastName }}</span>
        </span>
      </h1>

      <!-- Footer row: desc + CTA + scroll hint -->
      <div class="hero__footer" ref="footerEl">
        <p class="hero__desc">{{ identity.hero.description }}</p>

        <a href="#work" class="btn hero__cta magnetic" @click.prevent="scrollToWork">
          <span>{{ identity.hero.ctaButtonText }}</span>
          <span class="btn-arrow">↗</span>
        </a>

        <div class="hero__scroll-hint">
          <span>SCROLL</span>
          <div class="hero__scroll-line" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useNoiseField } from '~/composables/useNoiseField'
import { usePortfolioData } from '~/composables/usePortfolioData'

const props = defineProps<{ animate: boolean }>()

const { identity } = usePortfolioData()
const canvasEl = ref<HTMLCanvasElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const eyebrowEl = ref<HTMLElement | null>(null)
const footerEl = ref<HTMLElement | null>(null)

// Boot WebGL scene
const { ripple } = useNoiseField(canvasEl)

// Entry animation — triggered by parent after preloader
watch(
  () => props.animate,
  (val) => {
    if (val) runEntryAnimation()
  },
)

function runEntryAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  // Words fly in from below their overflow-clip containers
  tl.fromTo(
    '.hero__title-word',
    { y: '110%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 1.1, stagger: 0.08 },
    0,
  )

  // Eyebrow slides in
  tl.fromTo(
    eyebrowEl.value,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.7 },
    0.4,
  )

  // Footer row
  tl.fromTo(
    footerEl.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    0.7,
  )
}

// Text scatter on click
function scatterTitle() {
  if (!titleEl.value) return
  const words = titleEl.value.querySelectorAll<HTMLElement>('.hero__title-word')

  words.forEach((word) => {
    const angle = Math.random() * Math.PI * 2
    const force = 100 + Math.random() * 220

    gsap.to(word, {
      x: Math.cos(angle) * force,
      y: Math.sin(angle) * force - 80,
      rotation: (Math.random() - 0.5) * 360,
      opacity: 0,
      duration: 0.7 + Math.random() * 0.3,
      ease: 'power3.out',
      onComplete: () => {
        gsap.fromTo(
          word,
          { x: Math.cos(angle) * force, y: Math.sin(angle) * force - 80, opacity: 0 },
          { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.55)' },
        )
      },
    })
  })

  ripple()
}

function scrollToWork() {
  document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero__canvas {
  opacity: 1;
}
</style>
