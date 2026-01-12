<template>
  <div
    v-show="!window.isMinimized"
    class="absolute flex flex-col overflow-hidden rounded-lg border border-[var(--color-accent)] bg-surface/90 backdrop-blur-md shadow-2xl transition-shadow duration-200"
    :class="{
      'ring-1 ring-[var(--color-accent)] ring-offset-2 ring-offset-black': isActive,
      'transition-all duration-300 ease-out': isAnimating
    }"
    :style="{
      left: window.isMaximized ? '0px' : `${window.x}px`,
      top: window.isMaximized ? '0px' : `${window.y}px`,
      width: window.isMaximized ? '100vw' : `${window.width}px`,
      height: window.isMaximized ? 'calc(100vh - 48px)' : `${window.height}px`,
      zIndex: window.zIndex,
      cursor: isDragging ? 'grabbing' : 'auto'
    }"
    @mousedown="focus"
  >
    <!-- Title Bar -->
    <div
      class="flex h-10 w-full shrink-0 items-center justify-between border-b border-white/10 bg-black/50 px-3 select-none"
      @mousedown="startDrag"
      @dblclick="toggleMaximize"
      style="cursor: grab;"
    >
      <div class="flex items-center gap-3">
        <!-- Traffic Lights (Mac style but Cyber) -->
        <div class="flex gap-2">
           <button @click.stop="close" class="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400"></button>
           <button @click.stop="minimize" class="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-400"></button>
           <button @click.stop="toggleMaximize" class="h-3 w-3 rounded-full bg-green-500 hover:bg-green-400"></button>
        </div>
        <span class="font-mono text-xs uppercase tracking-wider text-text-secondary">
          {{ window.title }}
        </span>
      </div>
      
      <!-- Window ID / Decor -->
      <div class="font-mono text-[10px] text-[var(--color-accent)] opacity-50">
        PID: {{ window.id.toUpperCase() }}
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-auto relative scrollbar-hide">
      <slot />
    </div>
    
    <!-- Resize Handle (Corner) - Optional impl later -->
    <div class="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize bg-gradient-to-tl from-white/20 to-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useOS, type OSWindow } from '~/composables/useOS'

const props = defineProps<{
  window: OSWindow
}>()

const { focusWindow, closeWindow, minimizeWindow, updateWindowPosition, toggleMaximize: osToggleMaximize } = useOS()
const { activeWindowId } = useOS()

const isActive = computed(() => activeWindowId.value === props.window.id)
const isDragging = ref(false)
const isAnimating = ref(false) // Use for maximize animation, disable when dragging

// Drag Logic
let dragOffsetX = 0
let dragOffsetY = 0

const focus = () => {
  focusWindow(props.window.id)
}

const startDrag = (e: MouseEvent) => {
  if (props.window.isMaximized) return // Can't drag maximized
  
  focus()
  isDragging.value = true
  isAnimating.value = false // Disable transition interaction
  
  // Calculate click offset relative to window
  dragOffsetX = e.clientX - props.window.x
  dragOffsetY = e.clientY - props.window.y // Corrected: was e.clientX

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return
  
  // Simple constraint to keep somewhat on screen
  const newX = e.clientX - dragOffsetX
  const newY = e.clientY - dragOffsetY
  
  updateWindowPosition(props.window.id, newX, newY)
}

const stopDrag = () => {
  isDragging.value = false
  isAnimating.value = true // Re-enable transitions
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

const close = () => closeWindow(props.window.id)
const minimize = () => minimizeWindow(props.window.id)
const toggleMaximize = () => {
    isAnimating.value = true
    osToggleMaximize(props.window.id)
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
