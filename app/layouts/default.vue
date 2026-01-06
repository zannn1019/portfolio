<template>
  <div class="relative min-h-screen w-full">
    <!-- Global Transition Overlay -->
    <TransitionOverlay ref="transitionRef" />

    <!-- Global WebGL Fog/Grain -->
    <WebGLBackground
      class="fixed inset-0 z-[50] mix-blend-overlay opacity-30 pointer-events-none"
    />

    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Preloader -->
    <Preloader @complete="handlePreloaderComplete" />

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
import Preloader from "~/components/molecules/Preloader.vue";
import WebGLBackground from "~/components/atoms/WebGLBackground.vue";

const transitionRef = ref<InstanceType<typeof TransitionOverlay> | null>(null);
const router = useRouter();

const handlePreloaderComplete = () => {
  // Optional: Trigger any entrance animations on the main page here
  console.log("Preloader complete");
};

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
