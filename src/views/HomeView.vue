<template>
  <HeroSection />
  <v-container tag="section" class="d-flex flex-column my-8" style="gap: 2rem">
    <EventsListSection sectionTitle="Upcoming Events" :events="firstUpcomings" />
    <EventsListSection sectionTitle="Coming Soon Events" :events="firstUpcomings" />
    <ContactUsSection />
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
