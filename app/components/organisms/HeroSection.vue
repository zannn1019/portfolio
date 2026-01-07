<template>
  <section
    class="relative flex min-h-screen w-full flex-col justify-center px-6 pt-20"
  >
    <!-- Background Grid (Optional for Hero) -->
    <div
      class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"
    ></div>

    <div class="container mx-auto">
      <div class="mb-10 flex flex-col items-start">
        <TextReveal
          tag="h1"
          :duration="1.5"
          class="font-display text-[12vw] leading-[0.8] tracking-tighter text-white"
        >
          {{ identity.branding.logoText.first }}
        </TextReveal>
        <div class="flex items-center gap-4 self-end sm:gap-10">
          <TextReveal
            tag="h1"
            :duration="1.5"
            :stagger="0.2"
            class="font-display text-[12vw] leading-[0.8] tracking-tighter text-white"
          >
            {{ identity.branding.logoText.last }}
          </TextReveal>
        </div>
      </div>

      <!-- Hero Image / Visual -->
      <div
        class="relative mt-20 h-[60vh] w-full overflow-hidden rounded-sm"
        ref="imageContainer"
      >
        <!-- Abstract Background (Default) -->
        <div
          ref="heroImage"
          class="absolute inset-0 h-[120%] w-full bg-surface bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center grayscale filter transition-all duration-700 hover:grayscale-0"
        ></div>

        <div class="absolute bottom-6 left-6 max-w-md">
          <p class="font-mono text-sm uppercase text-white/70">
            {{ identity.hero.description }}
          </p>
        </div>

        <div class="absolute bottom-6 right-6">
          <div class="flex items-center gap-4">
            <div class="h-[1px] w-12 bg-white/20"></div>
            <span class="font-display text-xs uppercase tracking-widest text-white/50">SCROLL</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 right-10 hidden md:block">
      <div class="animate-bounce font-mono text-xs uppercase text-white/50">
        (Scroll)
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import identity from "~/data/identity.json";

const imageContainer = ref<HTMLElement | null>(null);
const heroImage = ref<HTMLElement | null>(null);

onMounted(() => {
  if (imageContainer.value && heroImage.value) {
    // Parallax for image
    gsap.to(heroImage.value, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: imageContainer.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Initial Reveal (Global)
    gsap.from(imageContainer.value, {
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
    });
  }
});
</script>
