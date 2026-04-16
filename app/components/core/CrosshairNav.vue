<template>
  <ClientOnly>
    <!-- Crosshair lines -->
    <div
      class="crosshair-h"
      :style="{ top: `${mouseY}px` }"
    />
    <div
      class="crosshair-v"
      :style="{ left: `${mouseX}px` }"
    />

    <!-- Quadrant zone labels — appear near cursor crosshair intersection -->
    <span
      v-for="(label, zone) in zoneLabels"
      :key="zone"
      class="crosshair-label"
      :class="{ 'is-active': activeZone === zone }"
      :style="labelStyle(zone as Zone)"
    >
      {{ label }}
    </span>

    <!-- Vertical Side Nav (persistent, right edge) -->
    <nav class="side-nav">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="item.href"
        class="side-nav__item magnetic"
        :data-text="item.label"
        @click.prevent="navigateTo(item.href)"
      >
        {{ item.label }}
      </a>
    </nav>
  </ClientOnly>
</template>

<script setup lang="ts">
type Zone = 'top' | 'right' | 'bottom' | 'left'

const mouseX = ref(0)
const mouseY = ref(0)
const activeZone = ref<Zone | null>(null)

const zoneLabels: Record<Zone, string> = {
  top: 'ABOUT',
  right: 'WORK',
  bottom: 'CONTACT',
  left: 'INDEX',
}

const zoneSections: Record<Zone, string> = {
  top: '#about',
  right: '#work',
  bottom: '#contact',
  left: '#hero',
}

const navItems = [
  { id: 'hero', label: 'INDEX', href: '#hero' },
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
]

function labelStyle(zone: Zone) {
  const OFFSET = 20
  const x = mouseX.value
  const y = mouseY.value
  const styles: Record<Zone, Record<string, string>> = {
    top:    { left: `${x + OFFSET}px`, top: `${y - 32}px` },
    bottom: { left: `${x + OFFSET}px`, top: `${y + 16}px` },
    left:   { left: `${x - 80}px`, top: `${y + OFFSET}px` },
    right:  { left: `${x + OFFSET}px`, top: `${y + OFFSET}px` },
  }
  return styles[zone]
}

function navigateTo(href: string) {
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const onMove = (e: MouseEvent) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY

    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy

    if (Math.abs(dx) > Math.abs(dy)) {
      activeZone.value = dx > 0 ? 'right' : 'left'
    } else {
      activeZone.value = dy > 0 ? 'bottom' : 'top'
    }
  }

  const onClick = (e: MouseEvent) => {
    if (!activeZone.value) return
    // Only navigate if the click is not on another interactive element
    const target = e.target as HTMLElement
    if (target.closest('a, button, input, textarea, select')) return
    navigateTo(zoneSections[activeZone.value])
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('click', onClick)

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('click', onClick)
  })
})
</script>
