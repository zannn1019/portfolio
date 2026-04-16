import * as THREE from 'three'
import vertSource from './shaders/noise.vert?raw'
import fragSource from './shaders/noise.frag?raw'

export interface NoiseFieldUniforms {
  uTime: THREE.IUniform<number>
  uResolution: THREE.IUniform<THREE.Vector2>
  uMouse: THREE.IUniform<THREE.Vector2>
  uIntensity: THREE.IUniform<number>
}

export class NoiseFieldScene {
  private renderer: THREE.WebGLRenderer | null = null
  private scene: THREE.Scene
  private camera: THREE.OrthographicCamera
  private mesh: THREE.Mesh | null = null
  private animationId: number | null = null
  private startTime: number = 0

  public uniforms: NoiseFieldUniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uIntensity: { value: 0 },
  }

  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.startTime = performance.now()
  }

  init(canvas: HTMLCanvasElement): void {
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.resize()

    // Full-screen quad geometry
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader: vertSource,
      fragmentShader: fragSource,
      uniforms: this.uniforms,
      transparent: true,
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    window.addEventListener('resize', this.resize.bind(this))
    this.animate()
  }

  setMouse(x: number, y: number): void {
    this.uniforms.uMouse.value.set(x, y)
  }

  resize(): void {
    if (!this.renderer) return
    const w = window.innerWidth
    const h = window.innerHeight
    this.renderer.setSize(w, h)
    this.uniforms.uResolution.value.set(w, h)
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this))
    this.uniforms.uTime.value = (performance.now() - this.startTime) / 1000
    this.renderer?.render(this.scene, this.camera)
  }

  destroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('resize', this.resize.bind(this))
    this.renderer?.dispose()
    this.renderer = null
  }
}
