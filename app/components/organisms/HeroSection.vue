<template>
  <section
    class="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-20"
  >
    <!-- Big Background Text -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center opacity-[0.03] select-none pointer-events-none"
    >
      <span
        class="text-[25vw] font-display font-black leading-none text-white whitespace-nowrap"
        >SYSTEM</span
      >
    </div>

    <div
      class="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
    >
      <!-- Left: Main Typography -->
      <div class="lg:col-span-8 relative">
        <!-- Floating Label -->
        <div
          class="absolute -top-12 left-2 font-mono text-xs text-accent flex items-center gap-2"
        >
          <div class="w-2 h-2 bg-accent animate-pulse"></div>
          SYSTEM_CHECK // OK
        </div>

        <h1
          class="font-display text-[13vw] sm:text-[15vw] leading-[0.8] tracking-tighter text-white select-none"
        >
          <span
            class="block transform hover:skew-x-12 transition-transform duration-500 origin-bottom-left"
            ref="title1"
            >UN</span
          >
          <span
            class="block ml-0 sm:ml-20 text-transparent stroke-text transform hover:-skew-x-12 transition-transform duration-500 origin-top-right"
            ref="title2"
            >BOUND</span
          >
        </h1>

        <div class="mt-8 ml-2 max-w-lg relative">
          <!-- Decorative line -->
          <div
            class="absolute left-[-1rem] top-0 bottom-0 w-[1px] bg-accent/30"
          ></div>

          <p
            class="font-mono text-sm text-text-secondary leading-relaxed uppercase pl-4"
          >
            // {{ identity.hero.label }} <br />
            {{ identity.hero.description }}
          </p>

          <div class="mt-8 flex gap-6 pl-4">
            <CyberButton @click="scrollToWork">
              {{ identity.hero.ctaButtonText }}
            </CyberButton>
          </div>
        </div>
      </div>

      <!-- Right: Floating Card / Visual -->
      <div
        class="lg:col-span-4 relative h-[50vh] flex items-center justify-center perspective-[1000px]"
      >
        <!-- Orange Circle Design -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-accent rounded-full blur-[80px] sm:blur-[100px] opacity-20 pointer-events-none mix-blend-screen animate-pulse-slow"
        ></div>

        <!-- Card -->
        <div
          ref="cardRef"
          class="relative w-64 h-80 bg-surface/80 backdrop-blur-md border border-white/10 p-6 transform rotate-6 hover:rotate-0 transition-transform duration-500 group shadow-2xl"
        >
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-accent"></div>
          <div
            class="absolute -bottom-2 -left-2 w-4 h-4 border border-accent"
          ></div>

          <h3 class="font-display text-2xl font-bold text-white">
            Infinite Canvas<br />v3.0
          </h3>
          <div class="mt-4 w-full h-[1px] bg-white/20"></div>
          <div class="mt-4 font-mono text-xs text-text-secondary">
            // INITIATE SEQUENCE: OMEGA
            <br /><br />
            SECTOR 7 geometry is expanding rapidly. Initiate overflow protocols
            immediately.
          </div>

          <div class="absolute bottom-6 w-full pr-12">
            <button
              class="w-full bg-accent text-black font-bold text-center py-2 text-xs uppercase hover:bg-white transition-colors"
            >
              Explore Core ->
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 right-10 hidden md:flex items-center gap-4">
      <span class="font-mono text-xs text-white/50">SCROLL_DOWN</span>
      <div class="w-[1px] h-12 bg-white/20 overflow-hidden relative">
        <div
          class="absolute top-0 left-0 w-full h-1/2 bg-accent animate-scrolldown"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import identity from "~/data/identity.json";
import CyberButton from "~/components/atoms/CyberButton.vue";

const title1 = ref(null);
const title2 = ref(null);
const cardRef = ref(null);

const scrollToWork = () => {
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  // Entrance Animation
  const tl = gsap.timeline();

  tl.from([title1.value, title2.value], {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out",
  });

  tl.from(
    cardRef.value,
    {
      x: 50,
      opacity: 0,
      rotate: 12,
      duration: 1.5,
      ease: "power4.out",
    },
    "-=1.2",
  );
});
</script>

<style scoped>
.stroke-text {
  -webkit-text-stroke: 2px white;
  color: transparent;
}
.perspective-1000 {
  perspective: 1000px;
}
@keyframes scrolldown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(200%);
  }
}
.animate-scrolldown {
  animation: scrolldown 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
