<template>
  <div class="relative min-h-screen w-full">
    <!-- Global Transition Overlay -->
    <TransitionOverlay ref="transitionRef" />

    <!-- Global WebGL Fog/Grain -->
    <WebGLBackground
      class="fixed inset-0 z-[50] mix-blend-overlay opacity-30 pointer-events-none"
    />

    <!-- CRT Vignette -->
    <div class="vignette"></div>

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
    
    <!-- Sound Toggle (Fixed Bottom Left) -->
    <button 
      @click="toggleMute"
      class="fixed bottom-10 left-10 z-[100] hidden md:flex items-center gap-2 font-mono text-xs uppercase text-white/50 hover:text-white transition-colors"
    >
      <span>{{ isMuted ? 'UNMUTE' : 'SOUND ON' }}</span>
      <div class="flex gap-[2px] items-end h-3" v-if="!isMuted">
         <div class="w-[2px] bg-current animate-bounce h-2"></div>
         <div class="w-[2px] bg-current animate-bounce h-3 delay-75"></div>
         <div class="w-[2px] bg-current animate-bounce h-1 delay-150"></div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSound } from "~/composables/useSound";
import Header from "~/components/organisms/Header.vue";
import Footer from "~/components/organisms/Footer.vue";
import CustomCursor from "~/components/atoms/CustomCursor.vue";
import TransitionOverlay from "~/components/atoms/TransitionOverlay.vue";
import Preloader from "~/components/molecules/Preloader.vue";
import WebGLBackground from "~/components/atoms/WebGLBackground.vue";

const transitionRef = ref<InstanceType<typeof TransitionOverlay> | null>(null);
const router = useRouter();
const { playHover, playClick, toggleMute, isMuted } = useSound()

const handlePreloaderComplete = () => {
  // Optional: Trigger any entrance animations on the main page here
  console.log("Preloader complete");
};

onMounted(() => {
  // Global Sound Listeners (Event Delegation)
  window.addEventListener('mouseenter', (e) => {
    const target = e.target as HTMLElement
    // We need to use capture phase or check if element matches desired types
    // Since 'mouseenter' doesn't bubble, we use 'mouseover' for delegation or attach to specific elements.
    // Let's use mouseover for bubbling.
  }, true)
  
  // Actually, let's use mouseover on window
  window.addEventListener('mouseover', (e) => {
     const target = e.target as HTMLElement
     if (target.closest('a, button, [data-cursor-hover]')) {
       // Debounce slightly to avoid spam? No, hover sound should be instant.
       // But we need to ensure we don't trigger it when moving INSIDE the same button.
       // 'mouseover' triggers when entering children.
       // Use a simple check or 'mouseenter' on all elements.
       // For simplicity/performance: Let's attach to elements dynamically or just use mouseover with a check.
       
       // Better approach:
       // The CustomCursor already queries all interactive elements.
       // Let's keep it simple: just checking 'A' or 'BUTTON' tag presence.
       if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.hasAttribute('data-cursor-hover')) {
          playHover()
       }
     }
  })

  window.addEventListener('mousedown', () => {
    playClick()
  })
})
;

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
