<template>
  <canvas ref="canvasEl" class="snake-cursor-canvas" />
</template>

<script setup lang="ts">
const canvasEl = ref<HTMLCanvasElement | null>(null)

// ---- Physics constants ----
const SEGMENTS   = 22     // number of chain links
const LINK_DIST  = 11     // max px between each link
const GRAVITY    = 0.18   // downward pull on tail
const DAMPING    = 0.82   // velocity decay (1 = no decay, 0 = instant stop)
const HEAD_R     = 7      // head radius px
const TAIL_R     = 1.2    // tail tip radius px

onMounted(async () => {
  await nextTick()
  if (!canvasEl.value) return
  const canvas = canvasEl.value
  const ctx    = canvas.getContext('2d')!

  // ---- Resize ----
  const resize = () => {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize, { passive: true })

  // ---- State ----
  let mx = window.innerWidth  / 2
  let my = window.innerHeight / 2
  let isHovering  = false
  let isClicking  = false

  // Verlet segments: current pos + previous pos
  interface Seg { x: number; y: number; ox: number; oy: number }
  const segs: Seg[] = Array.from({ length: SEGMENTS }, () => ({
    x: mx, y: my, ox: mx, oy: my,
  }))

  // ---- Event listeners ----
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX
    my = e.clientY
  }, { passive: true })

  window.addEventListener('mousedown', () => { isClicking = true  })
  window.addEventListener('mouseup',   () => { isClicking = false })

  document.addEventListener('mouseover', (e) => {
    const el = (e.target as HTMLElement).closest('a, button, [role="button"], .magnetic')
    isHovering = !!el
  })

  // ---- RAF loop ----
  let rafId: number

  function tick() {
    // --- Update head: snap to mouse ---
    segs[0].ox = segs[0].x
    segs[0].oy = segs[0].y
    segs[0].x  = mx
    segs[0].y  = my

    // --- Update tail segments: verlet + constraint ---
    for (let i = 1; i < SEGMENTS; i++) {
      const s    = segs[i]
      const prev = segs[i - 1]
      const t    = i / (SEGMENTS - 1)  // 0→head  1→tail

      // Verlet velocity
      const vx = (s.x - s.ox) * DAMPING
      const vy = (s.y - s.oy) * DAMPING

      s.ox = s.x
      s.oy = s.y
      s.x += vx
      s.y += vy + GRAVITY * t   // gravity increases toward tail

      // Distance constraint — pull segment toward previous
      const dx   = s.x - prev.x
      const dy   = s.y - prev.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > LINK_DIST) {
        const ratio = (dist - LINK_DIST) / dist
        s.x -= dx * ratio
        s.y -= dy * ratio
      }
    }

    // --- Draw ---
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Connecting spine line (very subtle)
    ctx.beginPath()
    ctx.moveTo(segs[0].x, segs[0].y)
    for (let i = 1; i < SEGMENTS; i++) {
      // Smooth curve through segments using quadratic bezier midpoints
      const mx2 = (segs[i].x + segs[i - 1].x) / 2
      const my2 = (segs[i].y + segs[i - 1].y) / 2
      ctx.quadraticCurveTo(segs[i - 1].x, segs[i - 1].y, mx2, my2)
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.10)'
    ctx.lineWidth   = 1.5
    ctx.stroke()

    // Segment dots
    for (let i = 0; i < SEGMENTS; i++) {
      const t      = i / (SEGMENTS - 1)
      const radius = HEAD_R - (HEAD_R - TAIL_R) * t
      const alpha  = 1 - t * 0.65

      // Head reacts to state
      let r = radius
      if (i === 0) {
        if (isClicking)  r = radius * 0.55
        else if (isHovering) r = radius * 2.2
      }

      // Glow halo on head only
      if (i === 0) {
        const grd = ctx.createRadialGradient(segs[i].x, segs[i].y, 0, segs[i].x, segs[i].y, r * 3.5)
        grd.addColorStop(0,   `rgba(255,255,255,${isHovering ? 0.18 : 0.08})`)
        grd.addColorStop(1,   'rgba(255,255,255,0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(segs[i].x, segs[i].y, r * 3.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Segment body
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.beginPath()
      ctx.arc(segs[i].x, segs[i].y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    rafId = requestAnimationFrame(tick)
  }

  tick()

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.snake-cursor-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
}
</style>
