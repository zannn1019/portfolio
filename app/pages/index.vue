<template>
  <div class="home-page">
    <Navigation />
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
</template>

<script setup>
const { gsap } = useGsap()

useHead({
  title: 'Home - Creative Developer Portfolio',
  meta: [
    { name: 'description', content: 'Award-winning creative developer specializing in modern web experiences' }
  ]
})

onMounted(() => {
  // Page load animation
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
