<template>
  <div class="h-full bg-gray-100">
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './common/NavBar.vue';
</script>
