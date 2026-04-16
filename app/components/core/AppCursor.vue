<template>
  <ClientOnly>
    <div
      ref="cursorDot"
      class="cursor"
      :style="{ opacity: 0 }"
    />
    <div
      ref="cursorRing"
      class="cursor-ring"
      :style="{ opacity: 0 }"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
const { cursorDot, cursorRing } = useMagneticCursor()
</script>
