<template>
  <div>
    <LoadingScreen @loaded="handleLoaded" />
    <Analytics />
    <CustomCursor />
    <NuxtPage :page-key="route => route.fullPath" />
  </div>
</template>

<script setup>
import { Analytics } from "@vercel/analytics/nuxt";

const isLoaded = useState('isLoaded', () => false)

const handleLoaded = () => {
  isLoaded.value = true
}

useHead({
  title: "Ahmad Fauzan - Fullstack Web Developer",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "Ahmad Fauzan - Fullstack Web Developer specializing in Nuxt.js and Laravel",
    },
  ],
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  cursor: none;
}

:root {
  --black: #000000;
  --white: #ffffff;
  --gray: #1a1a1a;
  --light-gray: #f5f5f5;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    sans-serif;
  background: var(--white);
  color: var(--black);
  overflow-x: hidden;
  cursor: none;
}

@media (max-width: 1024px) {
  body {
    cursor: auto;
  }
}

html {
  scroll-behavior: smooth;
}

::selection {
  background: var(--black);
  color: var(--white);
}
</style>
