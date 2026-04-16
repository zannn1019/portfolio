<template>
  <section id="about" class="section container">
    <!-- Section Header -->
    <div class="work__header" style="margin-bottom: clamp(3rem, 6vw, 6rem);">
      <div>
        <span class="section-number font-mono">{{ about.sectionNumber }}</span>
        <h2 class="text-2xl font-display text-upper" style="margin-top: 0.5rem;">{{ about.sectionLabel }}</h2>
      </div>
    </div>

    <!-- Main grid: manifesto left, details right -->
    <div class="about__grid">
      <!-- Left: Manifesto statement with word reveal -->
      <div>
        <p class="about__statement" ref="statementEl">
          <span
            v-for="(word, i) in statementWords"
            :key="i"
            class="word"
          >{{ word }}{{ i < statementWords.length - 1 ? '\u00a0' : '' }}</span>
        </p>

        <!-- Stats row -->
        <div class="about__stats" style="margin-top: 3rem;">
          <div
            v-for="stat in about.experience"
            :key="stat.label"
            class="stat-item"
          >
            <div class="stat-item__number font-display">{{ stat.number }}</div>
            <div class="stat-item__label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Right: Body text + Skills -->
      <div class="about__right">
        <div>
          <p class="about__body-text">
            {{ about.expertise.description }}
          </p>
        </div>

        <!-- Skills -->
        <div class="skills">
          <div
            v-for="skill in about.skills"
            :key="skill.name"
            class="skill-item"
          >
            <div class="skill-item__header">
              <span class="skill-item__name font-mono">{{ skill.name }}</span>
              <span class="skill-item__level text-muted font-mono">{{ skill.level }}%</span>
            </div>
            <div class="skill-item__bar-bg">
              <div
                class="skill-item__bar-fill"
                :data-level="skill.level"
              />
            </div>
          </div>
        </div>

        <!-- Tags / Certifications -->
        <div>
          <p class="form-label" style="margin-bottom: 1rem;">CERTIFICATIONS</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span
              v-for="cert in identity.contact.certifications"
              :key="cert"
              class="tag"
            >{{ cert }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioData } from '~/composables/usePortfolioData'

const { identity } = usePortfolioData()
const { about } = identity

const statementEl = ref<HTMLElement | null>(null)
const statementWords = about.statement.split(' ')
</script>
