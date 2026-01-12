<template>
  <div class="absolute inset-0 z-10 p-8 grid grid-cols-1 gap-8 content-start justify-items-start pointer-events-none">
    
    <!-- My Projects -->
    <button 
      @dblclick="openApp('projects')" 
      @touchstart="openApp('projects')"
      class="pointer-events-auto group flex flex-col items-center gap-2 w-24"
    >
      <div class="h-16 w-16 flex items-center justify-center rounded-xl bg-black/50 border border-white/10 backdrop-blur-sm transition-all group-hover:bg-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)] shadow-lg group-active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white group-hover:text-[var(--color-accent)]"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
      </div>
      <span class="font-mono text-xs text-white bg-black/50 px-2 rounded group-hover:text-[var(--color-accent)]">Projects</span>
    </button>

    <!-- About / Identity -->
    <button 
      @dblclick="openApp('identity')"
      @touchstart="openApp('identity')"
      class="pointer-events-auto group flex flex-col items-center gap-2 w-24"
    >
      <div class="h-16 w-16 flex items-center justify-center rounded-xl bg-black/50 border border-white/10 backdrop-blur-sm transition-all group-hover:bg-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)] shadow-lg group-active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white group-hover:text-[var(--color-accent)]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
      </div>
      <span class="font-mono text-xs text-white bg-black/50 px-2 rounded group-hover:text-[var(--color-accent)]">Identity</span>
    </button>

    <!-- Terminal -->
    <button 
      @dblclick="openApp('terminal')"
      @touchstart="openApp('terminal')"
      class="pointer-events-auto group flex flex-col items-center gap-2 w-24"
    >
      <div class="h-16 w-16 flex items-center justify-center rounded-xl bg-black/50 border border-white/10 backdrop-blur-sm transition-all group-hover:bg-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)] shadow-lg group-active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white group-hover:text-[var(--color-accent)]"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
      </div>
      <span class="font-mono text-xs text-white bg-black/50 px-2 rounded group-hover:text-[var(--color-accent)]">Terminal</span>
    </button>
    
  </div>
</template>

<script setup lang="ts">
import { useOS } from '~/composables/useOS'

const { openWindow } = useOS()

const openApp = (app: string) => {
  switch (app) {
    case 'projects':
      openWindow({ id: 'projects', title: 'Startups & Projects', component: 'ProjectsApp', width: 1000, height: 700 })
      break
    case 'identity':
      openWindow({ id: 'identity', title: 'Identity Profile', component: 'IdentityApp', width: 600, height: 800 })
      break
    case 'terminal':
      openWindow({ id: 'terminal', title: 'zsh — zan@root', component: 'TerminalApp', width: 700, height: 450 })
      break
  }
}
</script>
