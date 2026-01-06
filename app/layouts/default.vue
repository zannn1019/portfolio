<template>
  <div class="relative min-h-screen w-full">
    <!-- Global Transition Overlay -->
    <TransitionOverlay ref="transitionRef" />

    <!-- Global Noise Overlay -->
    <div
      class="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-overlay"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>

    <!-- Custom Cursor -->
    <CustomCursor />

    <Header />

    <!-- Main Content -->
    <main class="relative z-10 w-full bg-void mb-[50vh]">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { useRouter } from "vue-router";
import Header from "~/components/organisms/Header.vue";
import Footer from "~/components/organisms/Footer.vue";
import CustomCursor from "~/components/atoms/CustomCursor.vue";
import TransitionOverlay from "~/components/atoms/TransitionOverlay.vue";

const transitionRef = ref<InstanceType<typeof TransitionOverlay> | null>(null);
const router = useRouter();

// Intercept navigation to play transition
// Intercept navigation to play transition
router.beforeEach((to, from, next) => {
  // Check if we are going to a work page from anywhere (except self)
  if (to.path.startsWith("/work/") && to.path !== from.path) {
    if (transitionRef.value) {
      console.log("Transition: Starting...");
      transitionRef.value.playTransition(() => {
        console.log("Transition: Completed, navigating ->", to.path);
        next();
      });
    } else {
      console.warn("TransitionRef not ready");
      next();
    }
  } else {
    next();
  }
});
</script>
