<template>
  <section id="about" class="relative w-full py-32 border-t border-white/10">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 gap-16 md:grid-cols-12">
        <!-- Heading -->
        <div class="md:col-span-4">
           <TextReveal tag="h2" class="font-display text-xs uppercase tracking-widest text-text-secondary">
            {{ identity.about.sectionLabel }}
          </TextReveal>
        </div>

        <!-- Content -->
        <div class="md:col-span-8">
           <TextReveal tag="p" :duration="1" class="font-display text-4xl uppercase leading-tight text-white md:text-5xl">
            {{ identity.about.statement }}
          </TextReveal>
           <TextReveal tag="p" :duration="1.2" class="mt-10 font-mono text-sm leading-relaxed text-text-secondary md:max-w-xl">
            {{ identity.about.expertise.description }}
          </TextReveal>
          
          <!-- Skills Marquee -->
          <div class="mt-20 overflow-hidden py-10 border-y border-white/10">
             <div ref="marqueeInner" class="flex whitespace-nowrap gap-10">
                <!-- Repeat 4 times to ensure coverage for seamless loop -->
                <div class="flex gap-10">
                  <span v-for="skill in skills" :key="skill.name" class="font-display text-xl uppercase tracking-wider text-white/50">{{ skill.name }} •</span>
                </div>
                <div class="flex gap-10">
                  <span v-for="skill in skills" :key="'dup1-'+skill.name" class="font-display text-xl uppercase tracking-wider text-white/50">{{ skill.name }} •</span>
                </div>
                <div class="flex gap-10">
                  <span v-for="skill in skills" :key="'dup2-'+skill.name" class="font-display text-xl uppercase tracking-wider text-white/50">{{ skill.name }} •</span>
                </div>
                <div class="flex gap-10">
                  <span v-for="skill in skills" :key="'dup3-'+skill.name" class="font-display text-xl uppercase tracking-wider text-white/50">{{ skill.name }} •</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import identity from '~/data/identity.json'

const skills = identity.about.skills
const marqueeInner = ref(null)

onMounted(() => {
  if (marqueeInner.value) {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // 1. Seamless Loop Animation
    // We animate xPercent to -25% (because we have 4 sets, moving 1 set's worth is -25%)
    // Actually, to loop seamlessly, we need to move exactly the width of ONE set.
    // Since we have 4 identical sets, moving -25% will bring the 2nd set to the start position.
    // Then we repeat.
    
    // NOTE: This assumes each of the 4 divs is identical width.
    
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(marqueeInner.value, {
      xPercent: -25, 
      ease: "none",
      duration: 10 // Base speed
    });

    // 2. Velocity Reactivity
    ScrollTrigger.create({
      trigger: 'body', // Watch global scroll
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Calculate velocity factor
        const velocity = Math.abs(self.getVelocity());
        const timeScale = 1 + (velocity / 500); // Sensitivity
        
        // Smoothly adjust speed
        gsap.to(tl, {
          timeScale: timeScale,
          duration: 0.5,
          overwrite: true
        });
        
        // Reset to normal speed when not scrolling
        gsap.to(tl, {
          timeScale: 1,
          duration: 1,
          delay: 0.5 // Wait a bit before slowing down
        });
      }
    });
  }
})
</script>

<style scoped>

</style>
