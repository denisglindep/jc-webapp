<template>
  <v-carousel hide-delimiters height="100%">
    <v-carousel-item v-for="event in events" :key="event.id" cover :src="event?.cover_image">
      <div class="d-flex fill-height justify-center align-end">
        <v-btn size="x-large" class="mb-16" @click="goToEvent(event.id)"> View event </v-btn>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps(['events']);
const router = useRouter();

function goToEvent(id) {
  router.push({ name: 'event-details', params: { id } });
}
</script>
