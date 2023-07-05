<template>
  <div
    class="mx-auto d-flex fill-height items-center justify-center text-center"
    :style="{
      backgroundImage: `url('${eventInfo.cover_image}')`
    }"
  >
    <button class="btn btn-accent w-full text-white">View event</button>
  </div>
</template>
<script setup>
defineProps({
  eventInfo: Object
});
</script>
