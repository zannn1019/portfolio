<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} Ahmad Fauzan. Fullstack Web Developer.</p>
      <div class="social-links">
        <a href="#" target="_blank" rel="noopener">GitHub</a>
        <a href="#" target="_blank" rel="noopener">LinkedIn</a>
        <a href="#" target="_blank" rel="noopener">Twitter</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: 3rem 2rem;
  background: var(--gray);
  color: var(--white);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.social-links {
  display: flex;
  gap: 2rem;
}

.social-links a {
  color: var(--white);
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.social-links a:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
  }
}
</style>
