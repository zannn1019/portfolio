<template>
  <div
    class="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-0"
    ref="overlay"
  >
    <!-- The backdrop that bubbles up -->
    <!-- Changed to black for high contrast visibility -->
    <div class="absolute inset-0 h-full w-full bg-black" ref="backdrop"></div>

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

const overlay = ref<HTMLElement | null>(null);
const backdrop = ref<HTMLElement | null>(null);
const displacement = ref<SVGElement | null>(null);

const playTransition = (onComplete: () => void) => {
  if (!overlay.value || !backdrop.value || !displacement.value) {
    onComplete();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(overlay.value, { opacity: 0 });
      gsap.set(displacement.value, { attr: { scale: 0 } });
      onComplete();
    },
  });

  // 1. Make visible immediately
  tl.set(overlay.value, { opacity: 1 });

  // 2. Liquid Wipe (Circle expand)
  // Ensure clipPath starts at 0
  tl.fromTo(
    backdrop.value,
    { clipPath: "circle(0% at 50% 50%)" },
    {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.2,
      ease: "power4.inOut",
    },
    0
  );

  // 3. Distortion Ripple effect
  tl.to(
    displacement.value,
    {
      attr: { scale: 150 }, // Moderate scale for visible ripple
      duration: 1.0,
      ease: "power2.out",
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
/* Optional: Attach filter if we want the ripple on the backdrop itself, 
   but usually we want the distortion on the content UNDER it. 
   For now, we just animate the wipe. */
</style>
