<template>
  <section
    id="about"
    class="relative w-full py-32 border-t border-accent/10 bg-void overflow-hidden"
  >
    <!-- Decorative Grid -->
    <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 gap-16 md:grid-cols-12">
        <!-- Sidebar Label -->
        <div
          class="md:col-span-3 border-r border-accent/20 pr-6 hidden md:block"
        >
          <div class="sticky top-32">
            <div class="font-mono text-xs text-accent mb-2">SECTOR 01</div>
            <h2 class="font-display text-4xl uppercase text-white leading-none">
              IDEN<br />TITY
            </h2>
            <div class="mt-8 w-12 h-[2px] bg-accent"></div>

            <div class="mt-20 space-y-4">
              <div class="font-mono text-[10px] text-text-secondary">
                STATUS: ONLINE<br />
                UPTIME: 99.9%
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="md:col-span-9">
          <h3
            class="font-display text-2xl md:text-4xl text-white uppercase leading-tight mb-8"
          >
            <span class="text-accent">//</span> {{ identity.about.statement }}
          </h3>

          <p
            class="font-mono text-sm leading-relaxed text-text-secondary max-w-2xl text-justify"
          >
            {{ identity.about.expertise.description }}
          </p>

          <!-- Technical Skill Bars -->
          <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="(skill, i) in identity.about.skills"
              :key="i"
              class="group"
            >
              <div
                class="flex justify-between font-mono text-xs text-text-secondary mb-2 group-hover:text-accent transition-colors"
              >
                <span>{{ skill.name }}</span>
                <span>{{ skill.level }}%</span>
              </div>
              <div class="w-full h-1 bg-white/10 overflow-hidden">
                <div
                  class="h-full bg-accent transform origin-left scale-x-0 transition-transform duration-1000 ease-out delay-100 group-hover:scale-x-100"
                  style="width: 100%"
                ></div>
                <!-- Use width 100% and scale for animation, better perf -->
                <!-- Wait, I need to apply specific widths based on level. Using style binding. -->
                <div
                  class="h-full bg-white opacity-20 transform origin-left"
                  :style="{ transform: `scaleX(${skill.level / 100})` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Infinite Marquee -->
      <div class="mt-32 border-y border-white/5 py-6 overflow-hidden relative">
        <div
          class="absolute inset-0 bg-accent/5 skew-x-12 transform scale-110"
        ></div>
        <div ref="marqueeInner" class="flex whitespace-nowrap gap-10">
          <div v-for="n in 3" :key="n" class="flex gap-10">
            <span
              v-for="hl in identity.about.highlights"
              :key="hl"
              class="font-display text-4xl uppercase"
            >
              {{ hl }} <span class="text-accent mx-4">•</span>
            </span>
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
import identity from "~/data/identity.json";

const marqueeInner = ref(null);

onMounted(() => {
  if (marqueeInner.value) {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(marqueeInner.value, {
      xPercent: -33.33,
      ease: "none",
      duration: 15,
    });

    // Velocity Listener
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const timeScale = 1 + velocity / 200;
        gsap.to(tl, { timeScale: timeScale, duration: 0.2 });
        gsap.to(tl, { timeScale: 1, duration: 0.5, delay: 0.2 });
      },
    });
  }
});
</script>

<style scoped>
.stroke-text {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
  color: transparent;
}
</style>
