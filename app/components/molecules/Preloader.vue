<template>
  <div
    v-if="!isComplete"
    class="fixed inset-0 z-[20000] flex h-screen w-screen flex-col items-center justify-between bg-black px-6 py-10"
    ref="container"
  >
    <!-- Top Bar -->
    <div
      class="flex w-full justify-between font-mono text-xs uppercase text-text-secondary"
    >
      <span>ZAN — Portfolio '25</span>
      <span class="animate-pulse">Loading Assets</span>
    </div>

    <!-- Center Counter -->
    <div class="relative overflow-hidden">
      <h1
        class="font-display text-[15vw] leading-none tracking-tighter text-white mix-blend-difference"
        ref="counterRef"
      >
        0
      </h1>
    </div>

    <!-- Bottom Bar -->
    <div
      class="flex w-full justify-between font-mono text-xs uppercase text-text-secondary"
    >
      <span>Based in Indonesia</span>
      <span>Creative Developer</span>
    </div>

    <!-- Curtain (for exit) -->
    <div
      class="absolute left-0 top-0 h-full w-full bg-surface origin-bottom scale-y-0"
      ref="curtain"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const emit = defineEmits(["complete"]);
const isComplete = ref(false);
const container = ref(null);
const counterRef = ref(null);
const curtain = ref(null);

onMounted(() => {
  // Lock scroll
  document.body.style.overflow = "hidden";

  const tl = gsap.timeline({
    onComplete: () => {
      isComplete.value = true;
      document.body.style.overflow = "";
      emit("complete");
    },
  });

  // 1. Counter Animation
  const counter = { val: 0 };
  tl.to(counter, {
    val: 100,
    duration: 1.0,
    ease: "power2.inOut",
    onUpdate: () => {
      if (counterRef.value) {
        counterRef.value.innerText = Math.floor(counter.val);
      }
    },
  });

  // 2. Exit Animation
  // Slide text out
  tl.to(
    counterRef.value,
    {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    },
    "-=0.2"
  );

  // Slide surrounding UI out
  tl.to(
    ".text-text-secondary",
    {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
    },
    "-=0.4"
  );

  // Curtain wipe
  tl.to(container.value, {
    yPercent: -100,
    duration: 0.8,
    ease: "power4.inOut",
  });
});
</script>
