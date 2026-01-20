<template>
  <div class="relative min-h-screen w-full overflow-hidden select-none bg-void" @contextmenu.prevent>
    <!-- Desktop Icons -->
    <DesktopIcons />

    <!-- Window Manager -->
    <WindowFrame 
      v-for="win in windows" 
      :key="win.id"
      :window="win"
    >
      <!-- Dynamic App Component Loading -->
      <component 
        :is="resolveComponent(win.component)" 
        :window-id="win.id"
      />
    </WindowFrame>

    <!-- Taskbar -->
    <Taskbar @toggle-start="toggleStartMenu" />
  </div>
</template>

<script setup lang="ts">
import { useOS } from '~/composables/useOS'
import DesktopIcons from '~/components/os/DesktopIcons.vue'
import WindowFrame from '~/components/os/WindowFrame.vue'
import Taskbar from '~/components/os/Taskbar.vue'

// Import Apps (Mapping existing sections to OS Apps)
import ProjectsApp from '~/components/organisms/ProjectSection.vue' 
import IdentityApp from '~/components/organisms/AboutSection.vue' 
import TerminalApp from '~/components/organisms/ContactSection.vue'

const { windows } = useOS()

const resolveComponent = (name: string) => {
  switch (name) {
    case 'ProjectsApp': return ProjectsApp
    case 'IdentityApp': return IdentityApp
    case 'TerminalApp': return TerminalApp
    default: return 'div'
  }
}

const toggleStartMenu = () => {
    // Todo: Implement Start Menu
    console.log('Start Menu Clicked')
}

useHead({
  title: "ZAN-OS | Creative Developer",
  meta: [
    {
      name: "description",
      content: "Zanio (ZAN-OS). A web-based operating system portfolio.",
    },
  ],
});
</script>
