<template>
  <div
    class="hero-section-card-bg mx-auto flex h-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-center sm:px-6 lg:px-8"
    :style="{
      backgroundImage: `url('${eventInfo.cover_image}')`
    }"
  >
    <div class="container w-1/2 text-white">
      <h1 class="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
        {{ eventInfo.name_en }}
      </h1>
      <button class="btn btn-accent text-white">Get Started</button>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
  eventInfo: Object
});
</script>
