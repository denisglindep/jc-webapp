<template>
  <div class="h-full bg-slate-200">
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './common/NavBar.vue';
</script>
