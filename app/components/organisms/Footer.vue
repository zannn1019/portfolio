<template>
  <footer class="fixed bottom-0 left-0 -z-10 h-[50vh] w-full bg-surface text-white flex flex-col justify-end pb-10 px-6">
    <div class="w-full max-w-screen-xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
        <!-- Socials/Contact -->
        <div>
          <h3 class="font-display text-lg uppercase tracking-wide mb-4 text-text-secondary">Connect</h3>
          <ul class="space-y-2 font-mono text-sm text-text-primary">
            <li v-for="social in identity.footer.socialLinks" :key="social.name">
              <a :href="social.url" target="_blank" class="hover:text-accent transition-colors">{{ social.name }}</a>
            </li>
          </ul>
        </div>
        
        <!-- Big Text -->
        <div class="text-right">
          <h2 class="font-display text-[12vw] leading-none tracking-tighter opacity-20 select-none">
            {{ identity.branding.logoText.last }}
          </h2>
        </div>
      </div>
      
      <div class="mt-10 flex justify-between text-xs text-white/30 uppercase tracking-widest">
        <span>© {{ new Date().getFullYear() }} {{ identity.personal.fullName }}</span>
        <span>Nuxt 4 / GSAP / Lenis</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import identity from '~/data/identity.json'
</script>
