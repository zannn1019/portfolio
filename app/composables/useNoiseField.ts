import { gsap } from 'gsap'
import { NoiseFieldScene } from '~/webgl/NoiseFieldScene'
import type { Ref } from 'vue'

export function useNoiseField(canvasRef: Ref<HTMLCanvasElement | null>) {
  const scene = new NoiseFieldScene()

  onMounted(() => {
    if (!canvasRef.value) return

    scene.init(canvasRef.value)

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      scene.setMouse(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight,
      )
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Entry fade-in animation — GSAP drives the WebGL uniform
    gsap.fromTo(
      scene.uniforms.uIntensity,
      { value: 0 },
      {
        value: 1,
        duration: 3.0,
        ease: 'power2.inOut',
        delay: 1.2, // syncs with preloader exit
      },
    )

    onUnmounted(() => {
      window.removeEventListener('mousemove', onMouseMove)
      scene.destroy()
    })
  })

  /**
   * Call to animate a "ripple" effect — e.g., on section transitions
   */
  function ripple() {
    gsap.to(scene.uniforms.uIntensity, {
      value: 0.2,
      duration: 0.3,
      ease: 'power2.in',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.to(scene.uniforms.uIntensity, { value: 1, duration: 0.6 })
      },
    })
  }

  return { scene, ripple }
}
