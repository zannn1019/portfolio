<template>
  <button
    class="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-mono text-sm tracking-widest text-white transition-all duration-300 bg-transparent border border-white/20 hover:bg-accent hover:border-accent hover:text-black focus:outline-none"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <!-- Background Fill Animation -->
    <span
      class="absolute inset-0 w-full h-full bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
    ></span>

    <!-- Text Content -->
    <span class="relative z-10 flex items-center gap-2 group-hover:font-bold">
      <span ref="textRef">
        <slot />
      </span>
      <span
        class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >-></span
      >
    </span>

    <!-- Corner Accents -->
    <span
      class="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></span>
    <span
      class="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
// TODO: Add Glitch effect on hover using split-type later if needed
// For now, pure CSS/JS transition is clean and performant.

const textRef = ref(null);

const onEnter = () => {
  // Optional: Trigger sound or glitch
};

const onLeave = () => {};
</script>
