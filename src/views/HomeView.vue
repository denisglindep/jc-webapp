<template>
  <HeroSection />
  <EventsListSection sectionTitle="This Weekend" />
  <EventsListSection sectionTitle="Upcoming Events" />
  <EventsListSection sectionTitle="See All Soon Events" />
</template>

<script setup>
import HeroSection from '@/components/screens/Home/HeroSection.vue';
import EventsListSection from '@/components/screens/Home/EventsListSection.vue';
</script>
