<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn class="mt-4" color="primary" variant="plain" :ripple="false" to="/bookings">
          <template v-slot:prepend>
            <v-icon :icon="isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
          </template>
          {{ t('$vuetify.custom.backBtns.backToMyBookings') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="tickets.length > 0">
      <v-col v-for="ticket in tickets" :key="ticket.id" cols="12" md="6">
        <Ticket :ticket="ticket" :eventName="currenntBooking?.event[`name_${currentLang}`]" />
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
import { useLocale } from 'vuetify';
import { useRoute } from 'vue-router';
import { useBookings } from '@/stores';
import Ticket from './Ticket.vue';
import { computed } from 'vue';

const { t, isRtl } = useLocale();
const bookingsStore = useBookings();
const route = useRoute();
const tickets = bookingsStore.getBookingEventTickets(route.params.event_id);
const currenntBooking = bookingsStore.getSelectedBooking(route.params.id);
const currentLang = computed(() => (isRtl.value ? 'ab' : 'en'));
</script>
<style>
.test {
  min-height: 200px;
  max-width: 385px;
}
</style>
