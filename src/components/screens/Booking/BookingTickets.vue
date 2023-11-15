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
    <v-row v-if="tickets?.length > 0">
      <v-col v-for="card in 9" :key="card" cols="12" sm="6" md="4">
        <v-skeleton-loader class="skeleton" type="article, image" elevation="4" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="ticket in tickets" :key="ticket.id" cols="12" sm="6" lg="4">
        <Ticket :ticket="ticket" :eventName="currenntBooking?.event[`name_${currentLang}`]" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed } from 'vue';
import { useLocale } from 'vuetify';
import { useRoute } from 'vue-router';
import { useBookings } from '@/stores';
import Ticket from './Ticket.vue';

const { t, isRtl } = useLocale();
const bookingsStore = useBookings();
const route = useRoute();
const tickets = computed(() =>
  bookingsStore.getBookingEventTickets(route.params.event_id, route.params.id)
);
const currenntBooking = bookingsStore.getSelectedBooking(route.params.id);
const currentLang = computed(() => (isRtl.value ? 'ab' : 'en'));
</script>
<style>
.skeleton {
  min-height: 200px;
}
</style>
