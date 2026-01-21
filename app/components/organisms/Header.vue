<template>
  <header class="fixed left-0 top-0 z-50 w-full px-6 py-6 mix-blend-difference">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="group relative z-50 flex items-center gap-4">
        <span
          class="font-display text-2xl font-bold uppercase tracking-tighter text-white"
        >
          ZAN
        </span>
        <div
          class="hidden md:flex items-center gap-2 border border-white/20 px-2 py-1 rounded-full"
        >
          <div class="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
          <span
            class="font-mono text-[10px] text-white/50 uppercase tracking-widest"
            >System Online</span
          >
        </div>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex md:items-center md:gap-8">
        <NuxtLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="text-sm uppercase tracking-wider text-white hover:text-accent transition-colors font-mono"
          data-cursor-hover
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button
        class="md:hidden text-white uppercase text-sm tracking-widest z-50"
      >
        Menu
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import identity from "~/data/identity.json";

const navItems = identity.navigation.menuItems;
</script>
