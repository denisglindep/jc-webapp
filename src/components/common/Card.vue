<template>
  <div class="flex flex-col gap-4 rounded-3xl bg-slate-300 p-6 dark:bg-slate-800">
    <img :src="imageSrc" alt="Card Image" class="h-80 rounded-2xl object-cover" />
    <div class="flex grow flex-col justify-between gap-2">
      <h3 class="text-2xl font-bold">{{ title }}</h3>
      <div class="max-h-20 text-base font-normal text-slate-500 dark:opacity-80 md:overflow-auto">
        <p>{{ truncatedDescription }}</p>
      </div>

      <slot />
    </div>
    <button class="btn btn-accent w-full text-white" @click="performAction">View</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
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

const truncatedDescription = computed(() => {
  const maxLength = 200; // Set the maximum length for truncated description
  if (props.description.length <= maxLength) {
    return props.description;
  }
  return props.description.slice(0, maxLength) + '...';
});

function performAction() {
  // Code to perform the action when the button is clicked
  console.log('Action performed!');
}
</script>
