<template>
  <div>
    <NuxtRouteAnnouncer />

    <!-- Snake cursor (canvas, full screen, pointer-events: none) -->
    <CoreAppCursor />

    <!-- Fixed status bar (logo + live time) -->
    <header class="status-bar">
      <NuxtLink to="/" class="status-bar__logo">ZAN.SYS</NuxtLink>
      <div class="status-bar__right">
        <span class="status-bar__status font-mono">● ONLINE</span>
        <ClientOnly>
          <span class="status-bar__time font-mono">{{ liveTime }}</span>
        </ClientOnly>
      </div>
    </header>

    <!-- Page content -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const liveTime = ref('')
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  const update = () => {
    liveTime.value = new Date().toLocaleTimeString('en-US', { hour12: false })
  }
  update()
  timer = setInterval(update, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>
