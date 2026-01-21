<template>
  <section
    id="contact"
    class="pb-32 pt-32 relative w-full bg-void overflow-hidden"
  >
    <!-- Decorative Footer Grid -->
    <div
      class="absolute bottom-0 left-0 w-full h-[50vh] bg-grid opacity-10 pointer-events-none fade-t"
    ></div>

    <div class="container mx-auto px-6 relative z-10 text-center">
      <div
        class="inline-flex items-center gap-2 mb-10 border border-accent/20 px-4 py-2 rounded-full"
      >
        <div class="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
        <span class="font-mono text-xs text-accent uppercase tracking-widest"
          >Signal Detected</span
        >
      </div>

      <h2
        class="font-display text-[12vw] leading-[0.8] uppercase tracking-tighter text-white mb-10 mix-blend-exclusion select-none hover:text-accent transition-colors duration-500 cursor-pointer"
        @click="copyEmail"
      >
        <span class="block">LET'S</span>
        <span class="block">CONNECT</span>
      </h2>

      <div class="flex flex-col items-center gap-8">
        <p class="font-mono text-sm text-text-secondary max-w-md">
          // transmission_status: ready <br />
          We are ready to initiate the next phase of your digital evolution.
        </p>

        <CyberButton @click="sendMail"> INITIATE_UPLINK </CyberButton>

        <div class="mt-20 flex gap-8">
          <a
            v-for="social in identity.contact.social"
            :key="social.name"
            :href="social.url"
            target="_blank"
            class="font-mono text-xs text-text-secondary hover:text-accent transition-colors uppercase"
          >
            {{ social.name }}
          </a>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div
        v-if="copied"
        class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-accent text-black font-bold px-6 py-2 rounded-sm z-50 font-mono text-xs uppercase"
      >
        Coordinates Copied to Clipboard
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import identity from "~/data/identity.json";
import CyberButton from "~/components/atoms/CyberButton.vue";

const copied = ref(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(identity.contact.email);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  } catch (err) {
    console.error("Failed to copy", err);
  }
};

const sendMail = () => {
  window.location.href = `mailto:${identity.contact.email}`;
};
</script>

<style scoped>
.fade-t {
  mask-image: linear-gradient(to top, black, transparent);
  -webkit-mask-image: linear-gradient(to top, black, transparent);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
