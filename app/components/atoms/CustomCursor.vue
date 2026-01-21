<template>
  <div
    ref="cursor"
    class="pointer-events-none fixed left-0 top-0 z-[10000] hidden lg:block mix-blend-exclusion"
  >
    <!-- Crosshair Group -->
    <div class="relative">
      <!-- Outer Ring (Scale on Hover) -->
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-accent rounded-full transition-all duration-300 ease-out"
        :class="[
          isHovering
            ? 'scale-150 opacity-100 border-accent'
            : 'scale-50 opacity-50 border-white',
        ]"
      ></div>

      <!-- Center Cross -->
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 w-[1px] h-3 bg-accent transition-all duration-300"
        :class="{ 'h-6': isHovering }"
      ></div>
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-[1px] bg-accent transition-all duration-300"
        :class="{ 'w-6': isHovering }"
      ></div>

      <!-- Coordinates -->
      <div
        class="absolute top-4 left-4 font-mono text-[9px] text-accent tracking-widest tabular-nums leading-tight opacity-80"
        v-show="!isHovering"
      >
        X: {{ Math.round(coords.x) }}<br />
        Y: {{ Math.round(coords.y) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

const cursor = ref<HTMLElement | null>(null);
const isHovering = ref(false);
const coords = reactive({ x: 0, y: 0 });

// Cursor State
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

onMounted(() => {
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    coords.x = mouseX;
    coords.y = mouseY;
  });

  gsap.ticker.add(tick);

  // Attach hover listeners
  addHoverListeners();

  // Observer for dynamic elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) addHoverListeners();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

onBeforeUnmount(() => {
  gsap.ticker.remove(tick);
  // Clean up if needed
});

function addHoverListeners() {
  document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
    el.removeEventListener("mouseenter", onEnter);
    el.removeEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  });
}

function tick() {
  if (!cursor.value) return;

  // Smooth lerp for position
  const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
  cursorX += (mouseX - cursorX) * dt;
  cursorY += (mouseY - cursorY) * dt;

  gsap.set(cursor.value, {
    x: cursorX,
    y: cursorY,
  });
}

function onEnter() {
  isHovering.value = true;
}

function onLeave() {
  isHovering.value = false;
}
</script>
