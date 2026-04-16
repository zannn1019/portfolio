<template>
  <section id="work" class="work section container">
    <!-- Section Header -->
    <div class="work__header">
      <div>
        <span class="section-number font-mono">{{ identity.contact.sectionNumber.replace('03', '02') }}</span>
        <h2 class="text-2xl font-display text-upper" style="margin-top: 0.5rem;">SELECTED WORKS</h2>
      </div>
      <span class="tag">{{ projects.length }} PROJECTS</span>
    </div>

    <!-- Project Grid -->
    <div class="work__grid">
      <div
        v-for="(project, i) in projects"
        :key="project.slug"
        class="project-card"
      >
        <!-- Image Side -->
        <div class="project-card__image-wrap">
          <img
            :src="project.image"
            :alt="project.title"
            class="project-card__image"
            loading="lazy"
          />
        </div>

        <!-- Info Side -->
        <div class="project-card__info">
          <div>
            <div class="project-card__index font-mono">
              {{ String(i + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}
            </div>
            <div class="overflow-clip">
              <h3 class="project-card__title font-display">{{ project.title }}</h3>
            </div>
            <p class="project-card__desc">{{ project.description }}</p>
          </div>

          <div>
            <div class="project-card__tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              <span class="tag">{{ project.year }}</span>
            </div>
            <NuxtLink
              :to="`/work/${project.slug}`"
              class="project-card__link magnetic"
            >
              VIEW PROJECT
              <span class="project-card__link-arrow">↗</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioData } from '~/composables/usePortfolioData'

const { identity, projects } = usePortfolioData()
</script>
