import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Inject lenis instance so we can use it in components
    return {
      provide: {
        lenis
      }
    }
  }
})
