<template>
  <router-view />
</template>
<script>
import { useBookings, useAuth } from '@/stores';
import { onMounted } from 'vue';
const bookingsStore = useBookings();
const authStore = useAuth();
// fetch all bookings to have them ready for the tabs to display
onMounted(async () => {
  await bookingsStore.fetchUserBookings('upcoming', authStore?.user?.data?.id);
  await bookingsStore.fetchUserBookings('past', authStore?.user?.data?.id);
});
</script>
