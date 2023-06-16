<template>
  <HeroSection />
  <div class="container mx-auto">
    <EventsListSection sectionTitle="This Weekend" />
    <EventsListSection sectionTitle="Upcoming Events" />
    <EventsListSection sectionTitle="See All Soon Events" />
    <ContactUsSection />
  </div>
</template>

<script setup>
import HeroSection from '@/components/screens/Home/HeroSection.vue';
import EventsListSection from '@/components/screens/Home/EventsListSection.vue';
import ContactUsSection from '@/components/screens/Home/ContactUsSection.vue';
</script>
