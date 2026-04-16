precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uIntensity;

// ---- Ashima Arts simplex noise (compact 2D version) ----
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                 + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
               dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x   + h.x  * x0.y;
  g.yz = a0.yz * x12.xz  + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// ---- Fractal Brownian Motion ----
float fbm(vec2 p) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 5; i++) {
    val  += amp * snoise(p * freq);
    freq *= 2.0;
    amp  *= 0.5;
  }
  return val;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Mouse-driven UV distortion — noise "pulled" toward cursor
  vec2 toMouse = uMouse - uv;
  float dist = length(toMouse);
  float pull = uIntensity * 0.10 / (dist * dist + 0.25);
  vec2 distortedUV = uv + toMouse * pull;

  // Domain-warped fbm (2-pass Perlin warp)
  float t = uTime * 0.08;
  vec2 q = vec2(
    fbm(distortedUV * 2.5 + vec2(0.0, t)),
    fbm(distortedUV * 2.5 + vec2(5.2, t + 1.3))
  );
  float n = fbm(distortedUV * 2.0 + 1.7 * q + vec2(t * 0.5));
  n = n * 0.5 + 0.5; // remap to 0..1

  // Brutal B&W threshold — zero grey, pure cut
  float threshold = 0.5 + uIntensity * 0.05;
  float bw = step(threshold, n);

  // Subtle grain overlay for analog texture
  float grain = fract(sin(dot(uv * uResolution, vec2(127.1, 311.7))) * 43758.5453);
  float grainStrength = 0.04 * uIntensity;
  bw = mix(bw, grain, grainStrength);

  // Vignette: darkens edges
  float vig = 1.0 - smoothstep(0.4, 1.1, length(uv - 0.5) * 1.5);
  bw = mix(0.0, bw, 0.2 + vig * 0.8);

  // Fade in on load via uIntensity
  float alpha = uIntensity * 0.85;

  // Blue tint: dark → near-black navy, bright → electric blue
  vec3 dark  = vec3(0.02, 0.03, 0.08);
  vec3 light = vec3(0.0, 0.322, 0.063);
  vec3 color = mix(dark, light, bw);

  gl_FragColor = vec4(color, alpha);
}
