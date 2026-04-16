<template>
  <Transition name="preloader-exit">
    <div v-if="visible" class="preloader" :style="{ background: bgColor }">
      <span class="preloader__label">INITIALIZING SYSTEM</span>
      <div ref="countEl" class="preloader__count">{{ displayCount }}</div>
      <div ref="barEl" class="preloader__bar" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const emit = defineEmits<{ (e: 'complete'): void }>()

const visible = ref(true)
const countEl = ref<HTMLDivElement | null>(null)
const barEl = ref<HTMLDivElement | null>(null)
const displayCount = ref(0)
const bgColor = ref('#ffffff')

onMounted(() => {
  // Block scroll during load
  document.body.style.overflow = 'hidden'

  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = ''
      visible.value = false
      emit('complete')
    },
  })

  // Count 0 → 100 with accelerating ease
  const counter = { val: 0 }
  tl.to(counter, {
    val: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate() {
      displayCount.value = Math.round(counter.val)
    },
  })

  // Progress bar animation (synced)
  tl.to(barEl.value, { width: '100%', duration: 1.8, ease: 'power2.inOut' }, '<')

  // Flash: background goes black
  tl.to({ v: 0 }, {
    duration: 0.07,
    onStart: () => { bgColor.value = '#000000' },
  }, '-=0.05')

  // Count fades away
  tl.to(countEl.value, { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' }, '<')

  // Hold black for a beat, then exit (transition handles the rest)
  tl.to({}, { duration: 0.25 })
})
</script>

<style scoped>
.preloader-exit-leave-active {
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.preloader-exit-leave-from {
  clip-path: inset(0 0 0 0);
}
.preloader-exit-leave-to {
  clip-path: inset(0 0 100% 0);
}
</style>
