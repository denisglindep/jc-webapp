<template>
  <HeroSection />
  <div class="container mx-auto my-20 flex flex-col gap-20">
    <EventsListSection sectionTitle="Upcoming Events" :events="firstUpcomings" />
    <EventsListSection sectionTitle="Coming Soon Events" :events="firstUpcomings" />
    <ContactUsSection />
  </div>
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
