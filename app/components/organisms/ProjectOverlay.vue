<template>
  <div
    class="fixed inset-0 z-[9999] h-full w-full overflow-y-auto bg-black"
    ref="container"
    data-lenis-prevent
  >
    <div class="min-h-screen pb-40 pt-40">
      <div class="container mx-auto px-6">
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="fixed right-20 top-20 z-[10000] flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md transition-all hover:scale-110 hover:border-white"
        >
          <span class="sr-only">Close</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Header -->
        <div class="mb-32">
          <h1
            class="font-display text-[8vw] leading-[0.85] tracking-tighter text-white opacity-0 reveal-item"
          >
            {{ project.title }}
          </h1>

          <div
            class="mt-10 flex flex-wrap gap-x-20 gap-y-10 border-t border-white/10 pt-10 opacity-0 reveal-item"
          >
            <div class="max-w-md">
              <h3 class="mb-4 font-mono text-xs uppercase text-text-secondary">
                Role
              </h3>
              <p class="font-display text-xl uppercase text-white">
                {{ project.role }}
              </p>
            </div>
            <div class="max-w-md">
              <h3 class="mb-4 font-mono text-xs uppercase text-text-secondary">
                Client
              </h3>
              <p class="font-display text-xl uppercase text-white">
                {{ project.client }}
              </p>
            </div>
            <div class="max-w-md">
              <h3 class="mb-4 font-mono text-xs uppercase text-text-secondary">
                Year
              </h3>
              <p class="font-display text-xl uppercase text-white">
                {{ project.year }}
              </p>
            </div>
          </div>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <!-- Sticky Description -->
          <div
            class="h-fit lg:col-span-4 lg:sticky lg:top-40 opacity-0 reveal-item"
          >
            <h3 class="mb-8 font-mono text-xs uppercase text-text-secondary">
              The Brief
            </h3>
            <p class="font-sans text-lg leading-relaxed text-text-primary">
              {{ project.fullDescription }}
            </p>

            <div class="mt-10">
              <h3 class="mb-4 font-mono text-xs uppercase text-text-secondary">
                Tech Stack
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="rounded-full border border-white/10 px-4 py-2 font-mono text-xs uppercase text-white"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Gallery -->
          <div class="space-y-20 lg:col-span-8">
            <div
              v-for="(img, idx) in project.gallery"
              :key="idx"
              class="group relative overflow-hidden rounded-sm bg-gray-900 opacity-0 reveal-item"
            >
              <div
                class="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></div>
              <NuxtImg
                :src="img"
                format="webp"
                quality="80"
                class="h-auto w-full transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
              />
            </div>
          </div>
            <!-- Next Project Navigation -->
            <div class="mt-40 border-t border-white/10 pt-20">
              <p class="mb-8 font-mono text-xs uppercase text-text-secondary">Next Case</p>
              
              <button
                v-if="nextProject"
                @click="emit('open-next', nextProject)"
                class="group flex w-full items-center justify-between text-left"
              >
                <span class="font-display text-4xl uppercase text-white transition-colors group-hover:text-text-secondary md:text-6xl">
                  {{ nextProject.title }}
                </span>
                
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all group-hover:scale-125 group-hover:border-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="transition-transform group-hover:-rotate-45">
                    <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useNuxtApp } from "#app";
import gsap from "gsap";
import projectsData from "~/data/project.json";

const props = defineProps<{
  project: any;
}>();

const emit = defineEmits(["close", "open-next"]);
const container = ref(null);
const nuxtApp = useNuxtApp();

// Find current index and next project
const nextProject = computed(() => {
  const currentIndex = projectsData.findIndex(p => p.title === props.project.title);
  if (currentIndex === -1) return null;
  
  // Loop back to start if at end
  const nextIndex = (currentIndex + 1) % projectsData.length;
  return projectsData[nextIndex];
});

onMounted(() => {
  // Lock body scroll and stop Lenis
  document.body.style.overflow = "hidden";
  document.body.classList.add("overlay-active"); // Add class to hide header
  if (nuxtApp.$lenis) {
    (nuxtApp.$lenis as any).stop();
  }

  // Entry Animation
  const tl = gsap.timeline();

  // Slide up container
  tl.fromTo(
    container.value,
    { y: "100%" },
    { y: "0%", duration: 1, ease: "power4.out" }
  );

  // Stagger content
  tl.fromTo(
    ".reveal-item",
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    "-=0.5"
  );
});

onUnmounted(() => {
  // Unlock body and resume Lenis
  document.body.style.overflow = "";
  document.body.classList.remove("overlay-active");
  if (nuxtApp.$lenis) {
    (nuxtApp.$lenis as any).start();
  }
});
</script>
