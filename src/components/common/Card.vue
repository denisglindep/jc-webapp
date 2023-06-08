<template>
  <div class="card">
    <img :src="imageSrc" alt="Card Image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description text-slate-500 dark:opacity-80">{{ description }}</p>
      <div class="flex gap-4 text-slate-500 dark:opacity-80">
        <img :src="dateIcon" /> <span class="space-x-1">June 10th, 2023</span>
      </div>
    </div>
    <button class="btn btn-accent w-full text-white" @click="performAction">View</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import dateIcon from '@/assets/dateIcon.svg';
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
  @apply w-auto max-w-lg rounded-3xl bg-slate-300 p-6 dark:bg-slate-800;
}

.card-image {
  @apply h-80 w-full rounded-2xl object-cover;
}

.card-content {
  @apply my-4;
}

.card-title {
  @apply text-2xl font-bold;
}

.card-description {
  @apply my-4 text-base font-normal;
}
</style>
