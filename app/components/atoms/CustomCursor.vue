<template>
  <div
    ref="cursor"
    class="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference lg:block"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const cursor = ref<HTMLElement | null>(null)

// Cursor State
let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0

onMounted(() => {
  // Only init on desktop
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouchDevice) return

  // Mouse move listener
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // GSAP Ticker for smooth follow
  gsap.ticker.add(tick)

  // Hover listeners for specific elements
  document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
  })

  // Observe DOM changes to attach listeners to new elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const links = node.querySelectorAll('a, button, [data-cursor-hover]')
          links.forEach((el) => {
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
          })
          if (node.matches('a, button, [data-cursor-hover]')) {
            node.addEventListener('mouseenter', onEnter)
            node.addEventListener('mouseleave', onLeave)
          }
        }
      })
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  gsap.ticker.remove(tick)
  // Cleanup listeners if necessary (though component usually persists in default layout)
})

function tick() {
  if (!cursor.value) return
  
  // Smooth lerp
  const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio())
  cursorX += (mouseX - cursorX) * dt
  cursorY += (mouseY - cursorY) * dt

  gsap.set(cursor.value, {
    x: cursorX,
    y: cursorY
  })
}

function onEnter() {
  if (!cursor.value) return
  gsap.to(cursor.value, {
    scale: 3,
    duration: 0.3,
    ease: 'power3.out'
  })
}

function onLeave() {
  if (!cursor.value) return
  gsap.to(cursor.value, {
    scale: 1,
    duration: 0.3,
    ease: 'power3.out'
  })
}
</script>
