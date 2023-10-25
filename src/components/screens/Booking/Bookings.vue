<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h4 class="text-center text-h4 font-weight-bold">My Bookings</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs v-model="currentTab">
            <v-tab class="w-50" :rounded="false" value="upcoming" text="Upcoming" />
            <v-tab class="w-50" :rounded="false" value="past" text="Past" />
          </v-tabs>
          <v-window v-model="currentTab">
            <v-window-item value="upcoming">
              <BookingEventList :items="bookingsStore.bookings.upcoming" />
            </v-window-item>
            <v-window-item value="past">
              <BookingEventList :items="bookingsStore.bookings.past" />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBookings, useAuth } from '@/stores';
import BookingEventList from '@/components/screens/Booking/BookingEventList.vue';
const bookingsStore = useBookings();
const authStore = useAuth();
const route = useRoute();
const currentTab = ref(route.query.bookingsType || 'upcoming');

watch(currentTab, async () => {
  await bookingsStore.fetchUserBookings(currentTab.value, authStore?.user?.data?.id);
});
</script>
<style scoped></style>
