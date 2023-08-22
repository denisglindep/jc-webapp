<template>
  <HeroSection />
  <v-container tag="section" class="d-flex flex-column my-8" style="gap: 4rem">
    <EventsListSection
      sectionTitle="Upcoming Events"
      :events="firstUpcomings"
      eventType="upcoming"
    />
    <EventsListSection
      sectionTitle="Coming Soon Events"
      :events="firstUpcomings"
      eventType="coming-soon"
    />
    <ContactUsSection />
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import HeroSection from '@/components/screens/Home/HeroSection.vue';
import EventsListSection from '@/components/common/EventsListSection.vue';
import ContactUsSection from '@/components/screens/Home/ContactUsSection.vue';

import { useEvents } from '@/stores/events';
const eventsStore = useEvents();
const { firstUpcomings } = storeToRefs(eventsStore);
</script>
