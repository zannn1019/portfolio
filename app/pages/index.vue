<template>
  <div class="relative w-full bg-void perspective-[2000px]">
    <!-- Main Content Wrapper -->
    <div 
      class="origin-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
      :class="selectedProject ? 'scale-95 opacity-50 blur-sm pointer-events-none grayscale-[0.5]' : 'scale-100 opacity-100 blur-0'"
    >
      <HeroSection />
      <ProjectSection @open-project="handleOpenProject" />
      <AboutSection />
      <ContactSection />
    </div>

    <!-- Overlay -->
    <Transition name="fade">
    <!-- Overlay -->
    <Transition name="fade">
      <ProjectOverlay
        v-if="selectedProject"
        :key="selectedProject.title"
        :project="selectedProject"
        @close="handleCloseProject"
        @open-next="handleOpenProject"
      />
    </Transition>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProjectOverlay from "~/components/organisms/ProjectOverlay.vue";

const selectedProject = ref(null);

const handleOpenProject = (project: any) => {
  selectedProject.value = project;
};

const handleCloseProject = () => {
  selectedProject.value = null;
};

useHead({
  title: "ZAN | Creative Developer",
  meta: [
    {
      name: "description",
      content:
        "Portfolio of Zan, a creative developer specializing in Nuxt.js and GSAP.",
    },
  ],
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
