<template>
  <div>
    <CustomCursor />
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: 'Ahmad Fauzan Portfolio',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Award-winning creative developer portfolio' }
  ]
})
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
  --white: #FFFFFF;
  --gray: #1A1A1A;
  --light-gray: #F5F5F5;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
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
