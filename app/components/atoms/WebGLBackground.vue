<template>
  <div class="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-20">
    <canvas ref="canvas" class="h-full w-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;
let animationFrameId: number;
let uTimeLocation: WebGLUniformLocation | null = null;
let startTime: number;

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Simple pseudo-random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Value Noise
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    
    // Add time for animation
    float t = u_time * 0.1;
    
    // Multiple octaves of noise for grain/fog feel
    float n = noise(st * 3.0 + t);
    n += noise(st * 6.0 - t * 0.5) * 0.5;
    n += noise(st * 12.0 + t * 0.2) * 0.25;
    
    // High frequency grain
    float grain = random(gl_FragCoord.xy + t) * 0.15;
    
    vec3 color = vec3(n * 0.5 + grain);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const initWebGL = () => {
  if (!canvas.value) return;
  gl = canvas.value.getContext("webgl");
  if (!gl) return;

  // Compile Shaders
  const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vs || !fs) return;

  program = createProgram(gl, vs, fs);
  if (!program) return;

  gl.useProgram(program);

  // Set up geometry (full screen quad)
  const positionLocation = gl.getAttribLocation(program, "position");
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Uniforms
  uTimeLocation = gl.getUniformLocation(program, "u_time");
  const uResolutionLocation = gl.getUniformLocation(program, "u_resolution");

  if (uResolutionLocation) {
    gl.uniform2f(uResolutionLocation, canvas.value.width, canvas.value.height);
  }

  startTime = performance.now();
  resize();
  render();
};

const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vs: WebGLShader,
  fs: WebGLShader
) => {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

const resize = () => {
  if (!canvas.value || !gl || !program) return;
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;
  
  // Optimization: Render at 0.5x resolution to save GPU
  // The noise/fog will still look good (even softer)
  const scale = 0.5;

  if (
    canvas.value.width !== displayWidth * scale ||
    canvas.value.height !== displayHeight * scale
  ) {
    canvas.value.width = displayWidth * scale;
    canvas.value.height = displayHeight * scale;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const uResolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(uResolutionLocation, displayWidth * scale, displayHeight * scale);
  }
};

const render = () => {
  if (!gl || !program || !uTimeLocation) return;

  const time = (performance.now() - startTime) / 1000;
  gl.uniform1f(uTimeLocation, time);

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  animationFrameId = requestAnimationFrame(render);
};

onMounted(() => {
  initWebGL();
  window.addEventListener("resize", resize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  cancelAnimationFrame(animationFrameId);
});
</script>
