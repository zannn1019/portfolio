<template>
  <section class="w-full py-32 border-b border-white/10">
    <div class="container mx-auto px-6">
      <div class="mb-20">
        <h2 class="font-display text-4xl uppercase text-white mb-4">
          <span class="text-[var(--color-accent)]">/</span> System Authority
        </h2>
        <p class="font-mono text-xs uppercase text-text-secondary max-w-md">
          Verified technical competencies and authorized certifications.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="(cert, index) in certifications" 
          :key="index"
          class="group relative border border-white/10 bg-surface p-6 transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-white/5"
        >
          <div class="flex items-start justify-between mb-8">
            <span class="font-mono text-xs text-[var(--color-accent)]">0{{ index + 1 }}</span>
            <div class="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse"></div>
          </div>
          
          <h3 class="font-display text-2xl uppercase text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">
            {{ cert.name }}
          </h3>
          <p class="font-mono text-xs text-text-secondary uppercase mb-4">
            {{ cert.issuer }}
          </p>

          <div class="absolute bottom-4 right-4 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span class="font-mono text-[10px] uppercase bg-[var(--color-accent)] text-black px-2 py-1 rounded-sm">
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const certifications = [
  { name: 'MTCNA', issuer: 'MikroTik', year: '2023' },
  { name: 'MTCRE', issuer: 'MikroTik', year: '2023' },
  { name: 'Red Hat', issuer: 'System Admin', year: '2024' },
  { name: 'CEH', issuer: 'EC-Council', year: '2024' }
]
</script>
