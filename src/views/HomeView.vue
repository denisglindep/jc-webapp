<template>
  <HeroSection />
  <v-container>
    <div class="d-flex flex-column" style="gap: 5rem">
      <EventsListSection sectionTitle="Upcoming Events" :events="firstUpcomings" />
      <EventsListSection sectionTitle="Coming Soon Events" :events="firstUpcomings" />
      <ContactUsSection />
    </div>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import HeroSection from '@/components/screens/Home/HeroSection.vue';
import EventsListSection from '@/components/screens/Home/EventsListSection.vue';
import ContactUsSection from '@/components/screens/Home/ContactUsSection.vue';

import { useEvents } from '@/stores/events';
const eventsStore = useEvents();
const { firstUpcomings } = storeToRefs(eventsStore);
</script>
