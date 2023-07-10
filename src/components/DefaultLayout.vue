<template>
  <v-layout>
    <NavBar />
    <v-main class="bg-background">
      <router-view />
    </v-main>
    <!-- <SubscribeToNewsSection /> -->
    <!-- <Footer /> -->
  </v-layout>
</template>

<script setup>
import NavBar from './common/NavBar.vue';
// import Footer from './common/Footer.vue';
// import SubscribeToNewsSection from './screens/Home/SubscribeToNewsSection.vue';

import { useEvents } from '@/stores/events';
import { onMounted } from 'vue';

const events = useEvents();

onMounted(() => {
  events.getUpcomingEvents();
  events.getAllEventsByPage();
  events.getTodayEvents();
});
</script>
