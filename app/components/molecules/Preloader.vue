<template>
  <div
    v-if="!isComplete"
    class="fixed inset-0 z-[20000] flex h-screen w-screen flex-col items-center justify-center bg-void px-6 py-10 font-mono text-xs uppercase text-accent"
    ref="container"
  >
    <!-- Boot Sequence Text -->
    <div class="w-full max-w-md space-y-1">
      <div
        v-for="(line, i) in activeLines"
        :key="i"
        class="flex justify-between border-b border-accent/20 pb-1"
      >
        <span>> {{ line.text }}</span>
        <span>{{ line.status }}</span>
      </div>
    </div>

    <!-- ProgressBar -->
    <div
      class="mt-8 w-full max-w-md h-[2px] bg-accent/20 relative overflow-hidden"
    >
      <div
        class="absolute inset-y-0 left-0 bg-accent h-full w-full origin-left scale-x-0"
        ref="progressRef"
      ></div>
    </div>

    <!-- Percentage -->
    <div class="mt-2 w-full max-w-md text-right">
      <span ref="percentageRef">0</span>%
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import gsap from "gsap";

const emit = defineEmits(["complete"]);
const isComplete = ref(false);
const container = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);
const percentageRef = ref<HTMLElement | null>(null);

const activeLines = reactive<{ text: string; status: string }[]>([]);
const bootLines = [
  { text: "INITIALIZING KERNEL", status: "OK" },
  { text: "LOADING TEXTURES", status: "PENDING..." },
  { text: "CONNECTING TO GRID", status: "WAITING" },
  { text: "CALIBRATING VIEWPORT", status: "OK" },
  { text: "ESTABLISHING UPLINK", status: "OK" },
];

onMounted(() => {
  document.body.style.overflow = "hidden";

  const tl = gsap.timeline({
    onComplete: () => {
      // Exit Animation
      if (!container.value) return;
      gsap.to(container.value, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          isComplete.value = true;
          document.body.style.overflow = "";
          emit("complete");
        },
      });
    },
  });

  // 1. Add lines sequentially
  bootLines.forEach((line, index) => {
    tl.add(() => {
      activeLines.push(line);
      // Randomly update status of previous lines to OK
      if (index > 0 && activeLines[index - 1])
        activeLines[index - 1].status = "OK";
    }, index * 0.3);
  });

  // 2. Progress Bar
  if (progressRef.value) {
    tl.to(
      progressRef.value,
      {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut",
      },
      0,
    );
  }

  // 3. Percentage Counter
  const counter = { val: 0 };
  tl.to(
    counter,
    {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (percentageRef.value) {
          percentageRef.value.innerText = Math.floor(counter.val).toString();
        }
      },
    },
    0,
  );

  // Final wait
  tl.to({}, { duration: 0.5 });
});
</script>
