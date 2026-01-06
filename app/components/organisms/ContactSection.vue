<template>
  <section id="contact" class="pb-32 pt-20 relative w-full bg-void">
    <div class="container mx-auto px-6 text-center">
      <TextReveal
        tag="p"
        class="font-mono text-xs uppercase tracking-widest text-text-secondary mb-6"
      >
        What's Next?
      </TextReveal>

      <h2
        class="font-display text-6xl md:text-9xl uppercase tracking-tighter text-white mb-10 transition-colors cursor-pointer select-none relative h-[1.2em] overflow-hidden group"
        @click="copyEmail"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
      >
        <div class="relative w-full h-full">
          <span
            ref="textEl"
            class="block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0"
          >
            {{ copied ? "Email Copied!" : "Let's Talk" }}
          </span>
          <span
            class="absolute top-full left-0 w-full block transition-transform duration-500 group-hover:-translate-y-full h-full text-accent"
          >
            {{ copied ? "Email Copied!" : "Copy Email" }}
          </span>
        </div>
      </h2>

      <div class="flex justify-center">
        <MagneticButton>
          <a href="mailto:fauzanguci1019@gmail.com">Start a Project</a>
        </MagneticButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const copied = ref(false);
const textEl = ref(null);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText("hello@zan.com");
    copied.value = true;

    // Reset after 3 seconds
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  } catch (err) {
    console.error("Failed to copy", err);
  }
};

// Optional: Add hover magnetic effect specifically for this huge text if desired
const onEnter = (e: MouseEvent) => {
  // Implementation for text hover distortion could go here
};

const onLeave = (e: MouseEvent) => {
  // Reset effect
};
</script>
