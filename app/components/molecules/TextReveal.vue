<template>
  <component :is="tag" ref="textRef" class="text-reveal opacity-0">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  duration: {
    type: Number,
    default: 1
  },
  stagger: {
    type: Number,
    default: 0.05
  }
})

const textRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!textRef.value) return

  // Simple reveal for now. 
  // For "Ethereal Brutalism", a sharp Y translate + Opacity is good.
  gsap.fromTo(textRef.value, 
    {
      y: 50,
      opacity: 0,
      rotateX: 20
    },
    {
      scrollTrigger: {
        trigger: textRef.value,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: props.duration,
      ease: 'power3.out'
    }
  )
})
</script>

<style scoped>
.text-reveal {
  will-change: transform, opacity;
  transform-style: preserve-3d;
}
</style>
