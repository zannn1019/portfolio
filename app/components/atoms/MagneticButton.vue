<template>
  <NuxtLink
    v-if="to"
    :to="to"
    ref="btn"
    class="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 px-8 py-3 uppercase tracking-wider text-white transition-colors hover:border-white/40"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div ref="content" class="relative z-10 font-bold">
      <slot />
    </div>
    <div
      ref="filler"
      class="absolute left-0 top-0 h-full w-full scale-y-0 rounded-full bg-white transition-transform duration-300 ease-out"
    />
  </NuxtLink>

  <button
    v-else
    ref="btn"
    class="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 px-8 py-3 uppercase tracking-wider text-white transition-colors hover:border-white/40"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div ref="content" class="relative z-10 font-bold">
      <slot />
    </div>
    <div
      ref="filler"
      class="absolute left-0 top-0 h-full w-full scale-y-0 rounded-full bg-white transition-transform duration-300 ease-out"
    />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

defineProps<{
  to?: string;
}>();

const btn = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const filler = ref<HTMLElement | null>(null);

function onMouseMove(e: MouseEvent) {
  if (!btn.value || !content.value) return;

  const rect = btn.value.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(btn.value, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(content.value, {
    x: x * 0.2,
    y: y * 0.2,
    duration: 0.3,
    ease: "power2.out",
  });
}

function onMouseLeave() {
  if (!btn.value || !content.value) return;

  gsap.to([btn.value, content.value], {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.3)",
  });
}
</script>

<style scoped>
button:hover :deep(div:last-child) {
  /* This targets the filler div for a hover fill effect if desired, 
     though standard design might just be outline or scale. 
     Keeping it simple for now or adding hover fill via CSS.
  */
}
</style>
