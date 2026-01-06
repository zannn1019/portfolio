<template>
  <div v-if="project" class="min-h-screen bg-surface pb-40 pt-40">
    <div class="container mx-auto px-6">
      <!-- Back Link -->
      <NuxtLink
        to="/#work"
        class="group mb-20 inline-flex items-center gap-2 font-mono text-sm uppercase text-text-secondary transition-colors hover:text-white"
      >
        <span
          class="block transition-transform duration-300 group-hover:-translate-x-1"
          >←</span
        >
        Back to Grid
      </NuxtLink>

      <!-- Header -->
      <div class="mb-32">
        <TextReveal
          tag="h1"
          class="font-display text-[8vw] leading-[0.85] tracking-tighter text-white"
        >
          {{ project.title }}
        </TextReveal>

        <div
          class="mt-10 flex flex-wrap gap-x-20 gap-y-10 border-t border-white/10 pt-10"
        >
          <div class="max-w-md">
            <h3 class="mb-4 font-mono text-xs uppercase text-text-secondary">
              Role
            </h3>
            <p class="font-display text-xl uppercase text-white">
              {{ project.role }}
            </p>
          </div>
          <div class="max-w-md">
            <h3 class="mb-4 font-mono text-xs uppercase text-text-secondary">
              Client
            </h3>
            <p class="font-display text-xl uppercase text-white">
              {{ project.client }}
            </p>
          </div>
          <div class="max-w-md">
            <h3 class="mb-4 font-mono text-xs uppercase text-text-secondary">
              Year
            </h3>
            <p class="font-display text-xl uppercase text-white">
              {{ project.year }}
            </p>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 gap-20 lg:grid-cols-12">
        <!-- Sticky Description -->
        <div class="h-fit lg:col-span-4 lg:sticky lg:top-40">
          <h3 class="mb-8 font-mono text-xs uppercase text-text-secondary">
            The Brief
          </h3>
          <p class="font-sans text-lg leading-relaxed text-text-primary">
            {{ project.fullDescription }}
          </p>

          <div class="mt-10">
            <h3 class="mb-4 font-mono text-xs uppercase text-text-secondary">
              Tech Stack
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-white/10 px-4 py-2 font-mono text-xs uppercase text-white"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Gallery -->
        <div class="space-y-20 lg:col-span-8">
          <div
            v-for="(img, idx) in project.gallery"
            :key="idx"
            class="group relative overflow-hidden rounded-sm bg-gray-900"
          >
            <div
              class="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ></div>
            <img
              :src="img"
              class="h-auto w-full transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex min-h-screen items-center justify-center pt-40">
    <h1 class="font-display text-4xl text-white">Project Not Found</h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import projects from "~/data/project.json";

const route = useRoute();
const slug = route.params.slug as string;
const project = computed(() => projects.find((p) => p.slug === slug));
</script>
