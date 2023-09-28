<template>
  <v-container class="h-100">
    <BookingSummary />
  </v-container>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useEvents } from '@/stores';
import BookingSummary from '@/components/screens/Booking/BookingSummary.vue';

const eventsStore = useEvents();
const route = useRoute();

if (!eventsStore?.eventDetails?.data) {
  eventsStore.getEventDetails(route.params.id);
  eventsStore.getSeatsPricing(route.query?.date_id);
}
</script>
