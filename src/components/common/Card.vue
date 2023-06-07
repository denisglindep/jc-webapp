<template>
  <div class="card">
    <img :src="imageSrc" alt="Card Image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
    <button class="btn btn-accent w-full" @click="performAction">View</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  imageSrc: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
function performAction() {
  // Code to perform the action when the button is clicked
  console.log('Action performed!');
}
</script>

<style scoped>
.card {
  @apply w-auto rounded-3xl bg-slate-300 p-6;
}

.card-image {
  @apply h-80 w-full rounded-2xl object-cover;
}

.card-content {
  @apply my-4;
}

.card-title {
  @apply text-2xl font-bold text-slate-950;
}

.card-description {
  @apply my-4 text-base font-normal text-slate-500;
}
</style>
