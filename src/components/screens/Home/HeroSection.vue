<template>
  <section class="section-container">
    <div v-if="loading" class="d-flex fill-height justify-center align-center">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-carousel v-else hide-delimiters height="100%">
      <v-carousel-item v-for="event in today" :key="event.id" cover :src="event.cover_image">
        <div class="d-flex fill-height justify-center align-end">
          <v-btn size="large" class="mb-16"> View event </v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useEvents } from '@/stores/events';

const events = useEvents();
const { today, loading } = storeToRefs(events);
</script>

<style scoped>
.section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
}
</style>
