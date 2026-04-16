import { gsap } from 'gsap'

export function useMagneticCursor() {
  const cursorDot = ref<HTMLDivElement | null>(null)
  const cursorRing = ref<HTMLDivElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    if (!cursorDot.value || !cursorRing.value) return

    // Use GSAP quickTo for maximum performance — avoids Vue reactivity overhead
    const dotXTo = gsap.quickTo(cursorDot.value, 'x', { duration: 0.08, ease: 'none' })
    const dotYTo = gsap.quickTo(cursorDot.value, 'y', { duration: 0.08, ease: 'none' })
    const ringXTo = gsap.quickTo(cursorRing.value, 'x', { duration: 0.5, ease: 'power3' })
    const ringYTo = gsap.quickTo(cursorRing.value, 'y', { duration: 0.5, ease: 'power3' })

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible.value) {
        isVisible.value = true
        gsap.to([cursorDot.value, cursorRing.value], { opacity: 1, duration: 0.3 })
      }
      dotXTo(e.clientX)
      dotYTo(e.clientY)
      ringXTo(e.clientX)
      ringYTo(e.clientY)
    }

    const onMouseDown = () => cursorRing.value?.classList.add('is-clicking')
    const onMouseUp = () => cursorRing.value?.classList.remove('is-clicking')
    const onMouseLeave = () => gsap.to([cursorDot.value, cursorRing.value], { opacity: 0, duration: 0.3 })
    const onMouseEnter = () => gsap.to([cursorDot.value, cursorRing.value], { opacity: 1, duration: 0.3 })

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    // Set up magnetic elements — scanned once on mount
    setupMagneticElements(ringXTo, ringYTo)

    onUnmounted(() => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    })
  })

  function setupMagneticElements(
    ringXTo: gsap.QuickToFunc,
    ringYTo: gsap.QuickToFunc,
  ) {
    // Re-scan whenever DOM settles
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
        const onEnter = () => {
          cursorRing.value?.classList.add('is-hovering')
        }

        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const distX = ((e.clientX - cx) / rect.width) * 16
          const distY = ((e.clientY - cy) / rect.height) * 16

          gsap.to(el, { x: distX, y: distY, duration: 0.4, ease: 'power2.out' })
          ringXTo(cx + distX * 2)
          ringYTo(cy + distY * 2)
        }

        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
          cursorRing.value?.classList.remove('is-hovering')
        }

        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mousemove', onMove as EventListener)
        el.addEventListener('mouseleave', onLeave)
      })

      // Hover states for interactive elements
      document.querySelectorAll<HTMLElement>('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => cursorRing.value?.classList.add('is-hovering'))
        el.addEventListener('mouseleave', () => cursorRing.value?.classList.remove('is-hovering'))
      })
    })
  }

  return { cursorDot, cursorRing, isVisible }
}
