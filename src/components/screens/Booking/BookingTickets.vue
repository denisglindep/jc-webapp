<template>
  <v-container>
    <v-row>
      <v-btn class="mt-4" color="primary" variant="plain" :ripple="false" to="/bookings">
        <v-icon icon="mdi-arrow-left" />
        Back to My Bookings
      </v-btn>
    </v-row>
    <v-row v-if="tickets.length > 0">
      <v-col v-for="ticket in tickets" :key="ticket.id" cols="12" md="6">
        <Ticket :ticket="ticket" :eventName="currenntBooking?.event?.name_en" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="card in 9" :key="card" cols="12" sm="6" md="4">
        <v-skeleton-loader class="test" type="article, image" elevation="4" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useBookings } from '@/stores';
import { useRoute } from 'vue-router';
import Ticket from './Ticket.vue';
const bookingsStore = useBookings();
const route = useRoute();
const tickets = bookingsStore.getBookingEventTickets(route.params.event_id);
const currenntBooking = bookingsStore.getSelectedBooking(route.params.id);
</script>
<style>
.test {
  min-height: 200px;
  max-width: 385px;
}
</style>
