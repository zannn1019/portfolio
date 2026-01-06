<template>
  <div class="w-full bg-void">
    <HeroSection />
    <ProjectSection @open-project="handleOpenProject" />
    <AboutSection />
    <ContactSection />

    <Transition name="fade">
      <ProjectOverlay
        v-if="selectedProject"
        :project="selectedProject"
        @close="handleCloseProject"
      />
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
