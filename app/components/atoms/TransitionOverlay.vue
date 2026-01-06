<template>
  <div
    class="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-0"
    ref="overlay"
  >
    <!-- The backdrop that bubbles up -->
    <div class="absolute inset-0 h-full w-full bg-surface" ref="backdrop"></div>

    <!-- SVG Filter for the Liquid Distortion -->
    <svg class="absolute h-0 w-0">
      <defs>
        <filter id="liquid-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
            ref="displacement"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";

// Expose refs for animation control
const overlay = ref<HTMLElement | null>(null);
const backdrop = ref<HTMLElement | null>(null);
const displacement = ref<SVGElement | null>(null);

// Animation API
const playTransition = (onComplete: () => void) => {
  if (!overlay.value || !backdrop.value || !displacement.value) {
    onComplete();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      // Reset after navigation
      gsap.set(overlay.value, { opacity: 0 });
      gsap.set(displacement.value, { attr: { scale: 0 } });
      onComplete();
    },
  });

  // 1. Activate Overlay
  tl.set(overlay.value, { opacity: 1 });

  // 2. Liquid Intro (Distortion + Opacity up)
  tl.fromTo(
    backdrop.value,
    { clipPath: "circle(0% at 50% 50%)" },
    {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.2,
      ease: "power3.inOut",
    },
    0
  );

  // 3. Distortion Ripple
  tl.to(
    displacement.value,
    {
      attr: { scale: 200 },
      duration: 1,
      ease: "power2.in",
      yoyo: true,
      repeat: 1,
    },
    0
  );
};

defineExpose({
  playTransition,
});
</script>

<style scoped>
.liquid-active {
  filter: url(#liquid-filter);
}
</style>
