<template>
  <div class="fixed bottom-0 left-0 z-[9999] flex h-12 w-full items-center justify-between border-t border-white/10 bg-black/80 backdrop-blur-xl px-4">
    <!-- Start / Branding -->
    <div class="flex items-center gap-4">
      <button 
        class="flex items-center gap-2 rounded-md px-3 py-1 hover:bg-white/10 transition-colors"
        @click="$emit('toggle-start')"
      >
        <span class="font-display text-lg font-bold text-[var(--color-accent)]">ZAN</span>
        <span class="font-mono text-[10px] text-text-secondary">v1.0</span>
      </button>
      
      <!-- Active Apps Divider -->
      <div class="h-6 w-[1px] bg-white/10"></div>
      
      <!-- Open Windows -->
      <div class="flex items-center gap-2">
        <button
          v-for="win in windows"
          :key="win.id"
          @click="handleTaskbarClick(win.id)"
          class="flex items-center gap-2 rounded px-3 py-1.5 transition-all text-xs font-mono uppercase border border-transparent"
          :class="[
            activeWindowId === win.id && !win.isMinimized 
              ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/30' 
              : 'text-text-secondary hover:bg-white/5'
          ]"
        >
          <span class="h-2 w-2 rounded-full" :class="activeWindowId === win.id ? 'bg-[var(--color-accent)] animate-pulse' : 'bg-gray-500'"></span>
          {{ win.title }}
        </button>
      </div>
    </div>

    <!-- Tray -->
    <div class="flex items-center gap-6">
       <!-- Sound Toggle (Mini) -->
       <button class="text-xs font-mono text-text-secondary hover:text-white uppercase">
          VOL 100%
       </button>
       
       <!-- Clock -->
       <div class="font-mono text-xs text-[var(--color-accent)]">
          {{ time }}
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useOS } from '~/composables/useOS'

const { windows, activeWindowId, focusWindow, minimizeWindow } = useOS()

const time = ref('')

const updateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
}

let timer: NodeJS.Timer

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const handleTaskbarClick = (id: string) => {
  const win = windows.value.find(w => w.id === id)
  if (!win) return
  
  if (win.id === activeWindowId.value && !win.isMinimized) {
    minimizeWindow(id)
  } else {
    focusWindow(id)
  }
}
</script>
