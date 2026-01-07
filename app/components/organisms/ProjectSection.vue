<template>
  <section id="work" class="relative w-full py-32">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div
        class="mb-20 flex items-end justify-between border-b border-white/10 pb-10"
      >
        <TextReveal
          tag="h2"
          class="font-display text-6xl uppercase tracking-tighter text-white"
        >
          Selected<br />Works
        </TextReveal>
        <div class="hidden md:block">
          <p class="font-mono text-xs uppercase text-text-secondary">
            (2023 — Present)
          </p>
        </div>
      </div>

      <!-- Project Grid -->
      <div
        class="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-10 md:gap-y-32"
      >
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card group relative perspective-1000"
          :class="{ 'md:mt-32': index % 2 !== 0 }"
          @mousemove="(e) => handleCardMove(e, index)"
          @mouseleave="(e) => handleCardLeave(e, index)"
        >
          <!-- Image -->
          <div
            class="card-inner relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-surface transition-transform duration-100 ease-linear will-change-transform"
            :ref="el => setCardRef(el, index)"
          >
            <div
              class="absolute inset-0 z-10 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ></div>
            <!-- NuxtImg would go here -->
            <NuxtImg
              :src="project.image"
              :alt="project.title"
              provider="unsplash"
              sizes="sm:100vw md:50vw lg:600px"
              format="webp"
              quality="80"
              class="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
            />

            <div
              class="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              <MagneticButton @click="$emit('open-project', project)"
                >View Case</MagneticButton
              >
            </div>
          </div>

          <!-- Meta -->
          <div
            class="mt-6 flex items-start justify-between border-t border-white/10 pt-4"
          >
            <div>
              <h3 class="font-display text-3xl uppercase text-white">
                {{ project.title }}
              </h3>
              <p class="mt-2 font-mono text-xs uppercase text-text-secondary">
                {{ project.tags.join(" / ") }}
              </p>
            </div>
            <div class="font-mono text-xs text-text-secondary">
              {{ project.year }}
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
import projects from "~/data/project.json";

defineEmits(["open-project"]);

const cardRefs = ref<HTMLElement[]>([]);

const setCardRef = (el: any, index: number) => {
  if (el) cardRefs.value[index] = el;
};

// Magnetic Tilt Logic
const handleCardMove = (e: MouseEvent, index: number) => {
  const card = cardRefs.value[index];
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
  const rotateY = ((x - centerX) / centerX) * 5;

  gsap.to(card, {
    rotateX: rotateX,
    rotateY: rotateY,
    scale: 1.02,
    duration: 0.5,
    ease: "power2.out"
  });
};

const handleCardLeave = (e: MouseEvent, index: number) => {
  const card = cardRefs.value[index];
  if (!card) return;
  
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.5,
    ease: "power2.out"
  });
};
onMounted(() => {
  // Parallax for odd items could go here if managed manually,
  // but CSS margin-top on odd items handles the layout stagger nicely.
  // We can add reveal animations.

  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });
  });
});
</script>
