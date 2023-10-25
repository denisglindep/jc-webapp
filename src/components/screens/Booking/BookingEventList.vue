<template>
  <v-container>
    <v-row v-if="items.length > 0">
      <v-col v-for="booking in items" :key="booking.id" cols="12" md="6">
        <Booking :booking="booking" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="card in 9" :key="card" cols="12" md="6">
        <v-skeleton-loader type="image, article" elevation="4" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import Booking from './Booking.vue';

defineProps(['items']);
</script>
