<template>
  <div class="h-full bg-slate-200 dark:bg-slate-900">
    <NavBar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './common/NavBar.vue';
import Footer from './common/Footer.vue';
</script>
