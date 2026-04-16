import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  // Bridge Lenis scroll events → GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP ticker to drive Lenis RAF — critical for sync
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000)
  })

  // Remove lag smoothing to keep Lenis in sync
  gsap.ticker.lagSmoothing(0)

  return {
    provide: { lenis },
  }
})
