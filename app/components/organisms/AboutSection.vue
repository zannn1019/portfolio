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
          
          <!-- Skills Marquee (Simple CSS for now, or we could use GSAP Horizontal Loop) -->
          <div class="mt-20 overflow-hidden py-10 border-y border-white/10">
             <div class="flex animate-marquee whitespace-nowrap gap-10">
                <span v-for="skill in skills" :key="skill.name" class="font-display text-xl uppercase tracking-wider text-white/50">{{ skill.name }}</span>
                <span v-for="skill in skills" :key="'dup-'+skill.name" class="font-display text-xl uppercase tracking-wider text-white/50">{{ skill.name }}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import identity from '~/data/identity.json'
const skills = identity.about.skills
</script>

<style scoped>
.animate-marquee {
  animation: marquee 20s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
