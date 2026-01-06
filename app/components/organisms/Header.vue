<template>
  <header class="fixed left-0 top-0 z-50 w-full px-6 py-6 mix-blend-difference">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="group relative z-50">
        <span class="font-display text-2xl font-bold uppercase tracking-tighter text-white">
          ZAN
        </span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex md:items-center md:gap-8">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.name" 
          :to="item.path"
          class="text-sm uppercase tracking-wider text-white hover:text-accent transition-colors"
          data-cursor-hover
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button class="md:hidden text-white uppercase text-sm tracking-widest z-50">
        Menu
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import identity from '~/data/identity.json'

const navItems = identity.navigation.menuItems
</script>
