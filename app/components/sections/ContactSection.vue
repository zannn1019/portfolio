<template>
  <section id="contact" class="section">
    <!-- Giant kinetic text -->
    <div class="container" style="overflow: hidden;">
      <div class="contact__giant-text font-display" ref="giantTextEl">
        <span
          v-for="(line, i) in contact.title.lines"
          :key="i"
          style="display: block;"
        >{{ line }}</span>
      </div>
    </div>

    <div class="container">
      <div class="rule" style="margin-bottom: clamp(3rem, 6vw, 6rem);" />

      <div class="contact__grid">
        <!-- Left: Info -->
        <div class="contact__info-block">
          <div>
            <p class="contact__label">DIRECT LINE</p>
            <a :href="`mailto:${contact.email}`" class="contact__email magnetic">
              {{ contact.email }}
            </a>
          </div>

          <div>
            <p class="contact__label">EDUCATION</p>
            <p class="text-sm" style="color: rgba(255,255,255,0.6); line-height: 1.7;">
              {{ contact.education.school }}<br />
              {{ contact.education.major }}<br />
              <span class="font-mono text-xs" style="color: rgba(255,255,255,0.35);">{{ contact.education.years }}</span>
            </p>
          </div>

          <div>
            <p class="contact__label" style="margin-bottom: 1rem;">CHANNELS</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <a
                v-for="link in contact.social"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__link magnetic"
                style="font-size: var(--text-sm); text-transform: none; letter-spacing: 0;"
              >
                {{ link.name }} ↗
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <form class="contact__form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label" for="contact-name">YOUR NAME</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="Full name"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-email">YOUR EMAIL</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="email@domain.com"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-type">MISSION TYPE</label>
            <select
              id="contact-type"
              v-model="form.type"
              class="form-select"
            >
              <option
                v-for="opt in contact.form.projectTypes"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="contact-message">MESSAGE</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="form-textarea"
              placeholder="Describe your mission..."
              required
            />
          </div>

          <button
            type="submit"
            class="btn magnetic"
            :disabled="submitted"
          >
            <span>{{ submitted ? 'TRANSMITTED ✓' : contact.form.submitButtonText }}</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer" style="margin-top: clamp(4rem, 8vw, 8rem);">
      <p class="footer__copyright font-mono text-xs">
        © {{ new Date().getFullYear() }} — {{ identity.footer.copyrightText }}
      </p>
      <div class="footer__links">
        <a
          v-for="link in identity.footer.socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__link magnetic"
        >
          {{ link.name }}
        </a>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioData } from '~/composables/usePortfolioData'

const { identity } = usePortfolioData()
const { contact } = identity

const giantTextEl = ref<HTMLElement | null>(null)

const form = reactive({
  name: '',
  email: '',
  type: '',
  message: '',
})

const submitted = ref(false)

function handleSubmit() {
  // In production: send to API
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 4000)
}
</script>
