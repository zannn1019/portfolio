<template>
  <section id="work" class="relative w-full py-32 bg-void overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div
        class="mb-20 flex items-end justify-between border-b border-white/10 pb-10"
      >
        <div>
          <div class="font-mono text-xs text-accent mb-4">
            SECTOR 02 // ARCHIVE
          </div>
          <TextReveal
            tag="h2"
            class="font-display text-5xl md:text-7xl uppercase tracking-tighter text-white"
          >
            Selected<br />Works
          </TextReveal>
        </div>
        <div class="hidden md:block text-right">
          <div class="inline-flex items-center gap-2 mb-2">
            <div class="w-2 h-2 bg-accent animate-pulse"></div>
            <span class="font-mono text-xs text-accent">LIVE_FEED</span>
          </div>
          <p class="font-mono text-xs uppercase text-text-secondary">
            (2023 — Present)
          </p>
        </div>
      </div>

      <!-- Project Grid -->
      <div class="grid grid-cols-1 gap-y-24 md:grid-cols-2 md:gap-x-12">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card group relative"
          :class="{ 'md:mt-32': index % 2 !== 0 }"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave(index)"
        >
          <!-- Industrial Card Frame -->
          <div
            class="relative p-1 border border-white/10 bg-surface/50 transition-colors duration-300 group-hover:border-accent/50"
          >
            <!-- Corner Accents -->
            <div
              class="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div
              class="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div
              class="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <!-- Image Container -->
            <div
              class="relative aspect-[4/3] w-full overflow-hidden bg-black/50"
            >
              <div
                class="absolute inset-0 bg-accent/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
              ></div>
              <NuxtImg
                :src="project.image"
                :alt="project.title"
                sizes="sm:100vw md:50vw lg:600px"
                format="webp"
                quality="80"
                class="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              />

              <!-- Center Button -->
              <div
                class="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <button
                  @click="$emit('open-project', project)"
                  class="bg-black/80 backdrop-blur border border-accent text-accent px-6 py-3 font-mono text-xs uppercase hover:bg-accent hover:text-black transition-all"
                >
                  ACCESS_FILE
                </button>
              </div>
            </div>
          </div>

          <!-- Meta Data -->
          <div
            class="mt-6 border-l-2 border-white/10 pl-4 transition-colors group-hover:border-accent"
          >
            <div class="flex justify-between items-start">
              <h3
                class="font-display text-3xl uppercase text-white group-hover:text-accent transition-colors"
              >
                {{ project.title }}
              </h3>
              <span
                class="font-mono text-[10px] text-text-secondary border border-white/10 px-2 py-1 rounded-full"
              >
                {{ project.year }}
              </span>
            </div>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="font-mono text-[10px] text-text-secondary uppercase"
              >
                // {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "~/data/project.json";

defineEmits(["open-project"]);

// Optional hover state tracking if complex logic needed
const handleMouseEnter = (index: number) => {
  // Play sound or specific animation
};

const handleMouseLeave = (index: number) => {};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card, i) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });
  });
});
</script>

<style scoped>
/* Industrial styling specifics */
</style>
