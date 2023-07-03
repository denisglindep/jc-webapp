<template>
  <div
    class="hero-section-card-bg mx-auto flex h-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-center sm:px-6 lg:px-8"
    :style="{
      backgroundImage: `url('${eventInfo.cover_image}')`
    }"
  >
    <div class="container flex h-full w-1/4 flex-col items-center justify-end py-16 text-white">
      <button class="btn btn-accent w-full text-white">View event</button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  eventInfo: Object
});
</script>
