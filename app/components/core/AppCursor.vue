<template>
  <!-- Exact-position dot -->
  <div ref="dotEl" class="c-dot" />
  <!-- Lagging label -->
  <div ref="labelEl" class="c-label">
    <span class="c-text">{{ displayText }}</span>
  </div>
</template>

<script setup lang="ts">
// ─── State ────────────────────────────────────────────────────────
const dotEl   = ref<HTMLDivElement | null>(null)
const labelEl = ref<HTMLDivElement | null>(null)

const displayText = ref('') // reactive — Vue renders this
let clicking   = false
let hoverLabel = ''

// ─── Context labels per element type ─────────────────────────────
const LABEL_MAP: [string, string][] = [
  ['a[href^="mailto"]',       'TRANSMIT'],
  ['a[href*="/work/"]',       'VIEW PROJECT'],
  ['.project-card',           'VIEW PROJECT'],
  ['a[href="https://github"]','GITHUB →'],
  ['a[href*="linkedin"]',     'LINKEDIN →'],
  ['button[type="submit"]',   'SEND'],
  ['.btn',                    'ENTER'],
  ['a',                       'OPEN →'],
  ['button',                  'SELECT'],
]

function getLabel(el: HTMLElement): string {
  for (const [selector, label] of LABEL_MAP) {
    if (el.closest(selector)) return label
  }
  return ''
}

function padCoord(n: number): string {
  return String(Math.round(Math.abs(n))).padStart(4, '0')
}

onMounted(async () => {
  await nextTick()
  const dot   = dotEl.value
  const label = labelEl.value
  if (!dot || !label) return

  // Lerp target positions
  let mx = -200, my = -200      // raw mouse (dot follows exactly)
  let lx = -200, ly = -200      // lerp position (label follows with lag)
  let cx = -200, cy = -200      // display coords (separate lerp, slower)
  let visible = false

  // ─── Events ──────────────────────────────────────────────────
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY
    if (!visible) {
      visible = true
      dot.style.opacity   = '1'
      label.style.opacity = '1'
    }
  }, { passive: true })

  window.addEventListener('mousedown', () => {
    clicking = true
    dot.style.transform = `translate(${mx}px, ${my}px) scale(0.5)`
  })
  window.addEventListener('mouseup', () => {
    clicking = false
    dot.style.transform = `translate(${mx}px, ${my}px) scale(1)`
  })

  document.addEventListener('mouseover', (e) => {
    hoverLabel = getLabel(e.target as HTMLElement)
  })

  // ─── RAF loop ────────────────────────────────────────────────
  let rafId: number
  let lastFlicker = 0

  function tick(now: number) {
    // Label lerp — lags behind ~12% per frame
    lx += (mx - lx) * 0.12
    ly += (my - ly) * 0.12

    // Coord lerp — even slower, drifts to real position
    cx += (mx - cx) * 0.06
    cy += (my - cy) * 0.06

    // Dot: exact cursor
    dot.style.transform = `translate(${mx}px, ${my}px) scale(${clicking ? 0.5 : 1})`

    // Label: lagged, offset slightly to bottom-right
    label.style.transform = `translate(${lx + 16}px, ${ly + 8}px)`

    // Build display text (via Vue ref — RAF → reactive update)
    if (clicking) {
      displayText.value = '[ ▓▓▓▓▓▓ ]'
    } else if (hoverLabel) {
      displayText.value = `[ ${hoverLabel} ]`
    } else {
      // Glitch flicker: occasionally corrupt one digit for 1 frame
      const flicker = now - lastFlicker > 2200 && Math.random() < 0.04
      if (flicker) {
        lastFlicker = now
        const glitchChar = String.fromCharCode(48 + Math.floor(Math.random() * 10))
        const px = padCoord(cx).split('')
        px[Math.floor(Math.random() * 4)] = glitchChar
        displayText.value = `X ${px.join('')}  Y ${padCoord(cy)}`
      } else {
        displayText.value = `X ${padCoord(cx)}  Y ${padCoord(cy)}`
      }
    }

    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
  onUnmounted(() => cancelAnimationFrame(rafId))
})
</script>

<style scoped>
/* ── Exact dot ───────────────────────────────────────────────── */
.c-dot {
  position: fixed;
  top: 0; left: 0;
  width: 5px; height: 5px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10001;
  mix-blend-mode: difference;
  opacity: 0;
  transform: translate(-100px, -100px);
  will-change: transform;
  transition: transform 0s, opacity 0.3s;
}

/* ── Lagging label ───────────────────────────────────────────── */
.c-label {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  opacity: 0;
  transform: translate(-100px, -100px);
  will-change: transform;
}

.c-text {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  /* Subtle ghost background for readability over light sections */
  background: transparent;
  line-height: 1.4;
}
</style>
