<template>
  <div
    class="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-void select-none"
  >
    <!-- Infinite Grid Pattern -->
    <div
      class="absolute inset-0 bg-grid opacity-[0.08] bg-[length:4rem_4rem]"
    ></div>
    <div
      class="absolute inset-0 bg-grid opacity-[0.05] bg-[length:16rem_16rem]"
    ></div>

    <!-- Radial Gradient Fade -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void"
    ></div>

    <!-- Animated Scanline -->
    <div
      ref="scanline"
      class="absolute top-0 left-0 w-full h-[1px] bg-accent/20 shadow-[0_0_10px_rgba(255,62,0,0.5)]"
    ></div>

    <!-- Technical Markers -->
    <div
      class="absolute top-10 left-10 w-4 h-4 border-l border-t border-accent/40"
    ></div>
    <div
      class="absolute top-10 right-10 w-4 h-4 border-r border-t border-accent/40"
    ></div>
    <div
      class="absolute bottom-10 left-10 w-4 h-4 border-l border-b border-accent/40"
    ></div>
    <div
      class="absolute bottom-10 right-10 w-4 h-4 border-r border-b border-accent/40"
    ></div>

    <div class="absolute top-1/2 left-0 w-4 h-[1px] bg-accent/30"></div>
    <div class="absolute top-1/2 right-0 w-4 h-[1px] bg-accent/30"></div>
    <div class="absolute top-0 left-1/2 w-[1px] h-4 bg-accent/30"></div>
    <div class="absolute bottom-0 left-1/2 w-[1px] h-4 bg-accent/30"></div>

    <!-- Floating Graphic Elements (Optional decorative) -->
    <div
      class="absolute top-[20%] right-[15%] w-32 h-32 border border-dashed border-white/5 rounded-full opacity-20 animate-spin-slow"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";

const scanline = ref<HTMLElement | null>(null);

onMounted(() => {
  if (scanline.value) {
    gsap.to(scanline.value, {
      y: "100vh",
      duration: 8,
      ease: "none",
      repeat: -1,
    });
  }
});
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 20s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
