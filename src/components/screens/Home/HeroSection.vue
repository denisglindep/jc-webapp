<template>
  <section class="section-container">
    <div v-if="loading" class="d-flex fill-height justify-center align-center">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-carousel v-else hide-delimiters height="100%">
      <v-carousel-item v-for="event in today" :key="event.id" cover :src="event.cover_image">
        <div class="d-flex fill-height justify-center align-end">
          <v-btn size="x-large" class="mb-16" @click="goToEvent(event.id)"> View event </v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useEvents } from '@/stores';

const events = useEvents();
const { today, loading } = storeToRefs(events);
import { useRouter } from 'vue-router';
const router = useRouter();

function goToEvent(id) {
  router.push({ name: 'event-details', params: { id } });
}
</script>

<style scoped>
.section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
}
</style>
